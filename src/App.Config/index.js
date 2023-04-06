import data from "./Data";

function query (table='',column='', row ) {
const result=[]
`${data}?.${table}`.forEach(element => {
   
result.push(element)
});

return result

}

export {
    data,

query




};
