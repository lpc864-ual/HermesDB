import { Injectable } from '@nestjs/common';
import { Client as PGClient } from 'pg';
import { URL } from 'url';

@Injectable()
export class DbIntrospectorService {
  private readonly SUPPORTED_PROTOCOLS = ['postgres:', 'postgresql:'];

  async getDDLFromUrl(dbUrl: string): Promise<string> {
    const validation = this.isValidPostgresUrl(dbUrl);

    if (!validation.valid) throw new Error(`Invalid URL: ${validation.reason}`);

    const ddlMap = await this.getPostgresDDL(dbUrl);

    return Object.values(ddlMap)
      .map((sql) => sql.trim())
      .join('\n\n');
  }

  private isValidPostgresUrl(urlStr: string): {
    valid: boolean;
    reason?: string;
  } {
    try {
      const url = new URL(urlStr);

      const hasAllParts =
        !!url.username &&
        !!url.password &&
        !!url.hostname &&
        !!url.pathname &&
        url.pathname !== '/';

      if (!this.SUPPORTED_PROTOCOLS.includes(url.protocol)) {
        return {
          valid: false,
          reason: `Protocol not supported: ${url.protocol}`,
        };
      }

      if (!hasAllParts) {
        return {
          valid: false,
          reason: 'User, password, host, or database missing from URL',
        };
      }

      return { valid: true };
    } catch {
      return { valid: false, reason: 'Malformed or invalid URL' };
    }
  }

  private async getPostgresDDL(dbUrl: string): Promise<Record<string, string>> {
    const client = new PGClient({ connectionString: dbUrl });

    await client.connect();

    const tablesRes = await client.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
    `);

    const results: Record<string, string> = {};

    for (const row of tablesRes.rows) {
      const table = row.table_name;

      const columnsRes = await client.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_name = '${table}' AND table_schema = 'public';
      `);

      let ddl = `CREATE TABLE ${table} (\n`;

      ddl += columnsRes.rows
        .map(
          (col) =>
            `  ${col.column_name} ${col.data_type}` +
            (col.is_nullable === 'NO' ? ' NOT NULL' : '') +
            (col.column_default ? ` DEFAULT ${col.column_default}` : ''),
        )
        .join(',\n');
      ddl += '\n);';

      results[table] = ddl;
    }

    await client.end();

    return results;
  }
}
