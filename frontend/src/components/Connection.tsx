import uploadSign from '../assets/images/upload-sign.svg';

function ConnectionView() {
    return (
        <section className="min-h-screen bg-white flex flex-col items-center justify-center">
            <div className="flex flex-row gap-8 items-center">
                {/* Botón Upload Schema */}
                <button className="w-48 h-48 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl flex flex-col items-center justify-center gap-4 transition-all duration-200 shadow-sm hover:shadow-md">
                    <img 
                        src={uploadSign} 
                        alt="Upload icon" 
                        className="w-8 h-8 text-gray-800"
                    />
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-lg font-semibold text-gray-800">Upload Schema</span>
                        <span className="text-xs text-gray-600 text-center">Upload a .sql .json, or .dbml file describing your database</span>
                    </div>
                </button>

                {/* Botón Insert DB Credentials */}
                <button className="w-48 h-48 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl flex flex-col items-center justify-center gap-4 transition-all duration-200 shadow-sm hover:shadow-md">
                    <div className="text-4xl font-bold text-black">
                        URL
                    </div>
                    <div className="flex flex-col items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-gray-800">Connect to a Remote Database</span>
                        <span className="text-xs text-gray-600 text-center"> Use your connection URL </span>
                    </div>
                </button>
            </div>
        </section>
    );
}

export default function Connection() {
    return (
        <div>
            <ConnectionView />
        </div>
    )
}

