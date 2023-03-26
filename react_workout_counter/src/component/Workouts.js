import Card from "./Card";


function Workouts({data, UpdateCnt}) {

    return (

        <div className="container">
            {

                data.map((workout) => {
                    return <Card {...workout} UpdateCnt={UpdateCnt} key={workout.name}></Card>; // ... se cloning ho jati hai // key is important because without key the code won't work in production or when you want to host the site
                })

            }
        </div>
    );

}

export default Workouts;