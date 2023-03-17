
import { funSeque } from "flame-tools";


let processes=[];

export  const  ProcessManager={



process:()=>{
    if(processes.length>0){
funSeque({delaySeconds:2}, ...processes, ()=>{
    processes=[];
})


    

    }
   
},
addProcess:(func)=>{
processes.push(func);

return processes.length+' Action(s) waiting for Internet to be processed'

},
count:processes.length,
resetProcesses:()=>{
processes=[];
},
changeProcesses:(newProcesses)=>{
    processes=newProcesses
}




}