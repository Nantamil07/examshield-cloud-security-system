export default function FileInfoCard({file}){

    if(!file) return null;

    return(

        <div className="mt-5 bg-gray-100 p-4 rounded-lg">

            <h3 className="font-semibold mb-3">
                Selected File
            </h3>

            <p>Name : {file.name}</p>

            <p>Type : {file.type}</p>

            <p>Size : {(file.size/1024).toFixed(2)} KB</p>

        </div>

    );

}