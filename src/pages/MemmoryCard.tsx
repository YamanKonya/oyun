import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";


const images = [
  "https://cdn.royalcanin-weshare-online.io/XGkUPmYBG95Xk-RBXt1l/v1/ec5h-should-you-choose-a-kitten-or-adult-cat-hero-cat",
  "https://cdnuploads.aa.com.tr/uploads/Contents/2023/08/07/thumbs_b_c_d0dc1ea286a7ac2777af0221a0ab87a7.jpg?v=122627",
  "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/3B26/production/_103224151_kedi.jpg.webp",
  "https://kedimolsa.com/assets/blog/kedi-turleri-ve-ozellikleri-nelerdir.jpg",
  "https://cdn.listelist.com/wp-content/uploads/2017/05/CGGuD4XU0AAFY7a-620x375.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1kaR2VnSz4C69yQrf2ry8TbRX9Wzd9_cxtGDw0LtbRmxiSldZQXEa3IRW00BJ9bRJjcw&usqp=CAU",
  "https://www.kedimolsa.com/assets/images/19519708-dc97-40a3-9ceb-83b6abc68808.png",
  "https://vetesveteriner.com/wp-content/uploads/2023/04/kedi-irklari-listesi-vetesveteriner.jpg",
  "https://www.mapfre.com.tr/blog/media/2022/03/kedi-bakimi-icin-bilinmesi-gerekenler.jpeg",
  "https://blog.petibom.com/wp-content/uploads/2021/08/sirt-ustu-yatan-sevimli-kedi-960x400.jpg",
  "https://img-hopi.mncdn.com/20/9a/209a37663ef94b6fb141a6f5543efb96.jpeg",
  "https://www.labmedya.com/uploads/haberler-3/kedi.jpg",
  "https://st.depositphotos.com/1913515/1700/i/450/depositphotos_17006961-stock-photo-tabby-kitten-outdoors-meowing.jpg",
  "https://leylekvet.com/wp-content/uploads/2024/10/tekir-kedi.jpg",
];

interface IStarterProps {
  setName: any;
  timer: string;
  name: string;
  setTimer: any;
  setStart: any;
}

const Start = (props: IStarterProps) => {

    const [backCounter,setBackCounter] = useState(false);
    const counter = useRef<number>(3);
    const [count,setCount] = useState('');

    const backStepper = () =>{
        
        if(counter.current > 0){
          setCount(counter.current.toString());
          setTimeout(()=>{
              counter.current = counter.current -1;
              console.log(counter.current)
              backStepper();
              },1000);
          }else{
              setTimeout(()=>{
               setCount('Başla !')
               setTimeout(()=>{
                   props.setStart(true);
               },70)
              },100);
  
          }
    }
  
    useEffect(()=>{

        

        if(backCounter){
           
        backStepper();

        }
  
    },[backCounter])


if(backCounter) return (
        <div className="flex items-center justify-center min-h-screen w-[100%]" >
           
           <h2 className="text-[72px] animate-ping font-bold">{count}</h2>
        
        </div>
        )

if(!backCounter)  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Oyuna Başla</CardTitle>
          <CardDescription className="text-center">
            Oyuna başlamak için ayarları seçin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 w-[100%]">
                <Label htmlFor="framework">Lütfen Süre seçininz</Label>
                <Select 
                
                  defaultValue="5"
                  value={props.timer}
                  onValueChange={(val: string) => props.setTimer(val)}
                >
                  <SelectTrigger className="w-[100%]" id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="0.35">0.35</SelectItem>
                    <SelectItem value="0.45">0.45</SelectItem>
                    <SelectItem value="0.50">0.50</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-[100%]">
          <Button
            disabled={props.timer === ""}
            onClick={() =>
               props.timer !== ""
                ? setBackCounter(true)
                : null
            }
            className="w-[100%]"
          >
            Başla
          </Button>
        </CardFooter>
      </Card>
    </div>
  );



};

interface IGame {
    setFinish:any,
    time:number
}


const Game = (props:IGame) => {

    const [selectedImage,setSelectedImage] = useState<string>('');
    const [oldSelectedImages,setOldSelectedImages] = useState<string[]>([]);
    const falseSelected = useRef<string[]>([]);
    const [closeImage,setCloseImage] = useState(false);
    const [answers,setAnswers] = useState<string[]>([]);
    const [finish,setFinish] = useState(false);

    useEffect(()=>{
        HandleMemmoryCard();
    },[])

    function karistirDizi(dizi:string[]) {
        for (let i = dizi.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); 
          [dizi[i], dizi[j]] = [dizi[j], dizi[i]]; 
        }
        return dizi;
      }

    const createAnswers= (selected:string) =>{
       
        let index =Math.floor(Math.random()*images.length-1 ) 
              

            for(let x= 0 ; x < (index < 5 ? 4 : index) ; x++){
                    if(selected !== images[x] && falseSelected.current.indexOf(images[x]) <= -1 && falseSelected.current.length <3){
                        falseSelected.current.push(images[x]);
                    }
            }
            falseSelected.current.push(selected);
            falseSelected.current = karistirDizi(falseSelected.current)
            setAnswers(falseSelected.current);
    }



    const HandleMemmoryCard = () =>{
        setCloseImage(false);
        setSelectedImage("");
        falseSelected.current = [];
        setAnswers([]);
        const selected = images[Math.floor(Math.random()*images.length-1)]
        console.log(selected);

        if(!selected) return HandleMemmoryCard();

    console.log(selectedImage)
    
    if(oldSelectedImages.length-1 === images.length-1){
      return setFinish(true);  
    }

    if(oldSelectedImages.indexOf(selected) > -1){
     HandleMemmoryCard();
    }

   setSelectedImage(selected);

   setTimeout(()=>{

    setCloseImage(true);

    console.log(props.time)

    setTimeout(()=>{

        createAnswers(selected);
    },200);

   },props.time*1000);
   


    }

    const HandleForm = (answer:string) =>{
     
    if(selectedImage === answer){
        alert('Doğru Cevap');
        setOldSelectedImages((prev)=>[...prev,answer]);

    } else{
        alert("Yanlış Cevap");
        setOldSelectedImages((prev)=>[...prev,answer]);


    }
    HandleMemmoryCard();

    }



  return ( <div className="flex flex-col justify-center items-center min-h-screen">
         


         {
          finish ? (<h2 className=""> Oyun bitti <span className="text-blue-500 cursor-pointer" onClick={()=>window.location.reload()}> Tekrar başlamak için tıkla</span> </h2>) : ( <> <img src={selectedImage} alt="bil bakalım" className={`max-w-[500px] ${closeImage ? 'hidden' :'block'}`}/>

            <div className= {`mt-20 pl-10 pr-10 flex space-x-4`}>
               
               {answers.map((a,i)=>
            (
                <img src={a} key={i} onClick={()=>HandleForm(a)} alt="sec bakalim" className="max-w-[250px]" />
            ))}
      
            </div> </>)
         }
 

  </div> );
};



export default function MemoryQuizGame() {
  const [start, setStart] = useState(false);
  const [name, setName] = useState("");
  const [timer, setTimer] = useState("");

  return !start ? (
    <Start
      setStart={(val: boolean) => setStart(val)}
      setName={(val: string) => setName(val)}
      name={name}
      timer={timer}
      setTimer={(val: string) => setTimer(val)}
    />
  ) : (
    <Game time={Number(timer)} setFinish={()=>console.log("tamam")} />
  );
}
