import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
function Rating(props) {
    if(props.rating==0.5){
        return(
            <div>
                <BsStarHalf/>
                <BsStar/>
                <BsStar/>
                <BsStar/>
                <BsStar/>
            </div>
        )
    }else if(props.rating==1){
        return(
            <div>
                <BsStarFill/>
                <BsStar/>
                <BsStar/>
                <BsStar/>
                <BsStar/>
            </div>
        )
    }else if(props.rating==1.5){
        return(
            <div>
                <BsStarFill/>
                <BsStarHalf/>
                <BsStar/>
                <BsStar/>
                <BsStar/>
            </div>
        )
    }else if(props.rating==2){
        return(
            <div>
                <BsStarFill/>
                <BsStarFill/>
                <BsStar/>
                <BsStar/>
                <BsStar/>
            </div>
        )
    }else if(props.rating==2.5){
        return(
            <div>
                <BsStarFill/>
                <BsStarFill/>
                <BsStarHalf/>
                <BsStar/>
                <BsStar/>
            </div>
        )
    }else if(props.rating==3){
        return(
            <div>
                <BsStarFill/>
                <BsStarFill/>
                <BsStarFill/>
                <BsStar/>
                <BsStar/>
            </div>
        )
    }else if(props.rating==3.5){
        return(
            <div>
                <BsStarFill/>
                <BsStarFill/>
                <BsStarFill/>
                <BsStarHalf/>
                <BsStar/>
            </div>
        )
    }else if(props.rating==4){
        return(
            <div>
                <BsStarFill/>
                <BsStarFill/>
                <BsStarFill/>
                <BsStarFill/>
                <BsStar/>
            </div>
        )
    }else if(props.rating==4.5){
        return(
            <div>
                <BsStarFill/>
                <BsStarFill/>
                <BsStarFill/>
                <BsStarFill/>
                <BsStarHalf/>
            </div>
        )
    }else if(props.rating==5){
        return(
            <div>
                <BsStarFill/>
                <BsStarFill/>
                <BsStarFill/>
                <BsStarFill/>
                <BsStarFill/>
            </div>
        )
    }else{
        return(
            <div>
                <BsStar/>
                <BsStar/>
                <BsStar/>
                <BsStar/>
                <BsStar/>
            </div>
        )
    }
  }
  
  export default Rating;