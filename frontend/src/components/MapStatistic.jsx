function MapStatistic({ data = [] }) {


    let tinggi = 0;
    let sedang = 0;
    let rendah = 0;



    data.forEach((item)=>{


        const jiwa = Number(
            item.jumlah_jiwa_terdampak || 0
        );



        if(jiwa > 500){

            tinggi++;

        }

        else if(jiwa >= 100){

            sedang++;

        }

        else{

            rendah++;

        }


    });





    return (

        <div className="card shadow">


            <div className="card-header">

                <b>
                    Statistik Wilayah
                </b>

            </div>



            <div className="card-body">


                <h5>
                    🔴 {tinggi} Wilayah
                </h5>



                <h5>
                    🟠 {sedang} Wilayah
                </h5>



                <h5>
                    🟢 {rendah} Wilayah
                </h5>


            </div>



        </div>

    );


}


export default MapStatistic;