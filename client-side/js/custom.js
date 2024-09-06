async function getData(){
    let res=await fetch("http://localhost:3000/getdonors")
    let donors=await res.json();
    str=``
    donors.map((donor)=>{
        // console.log(donor);
        str+=`
        <div class="datas"><input type="text" name="name" id="name-${donor._id}" value=${donor.name} placeholder="Name" disabled=true >
    <input type="email" name="email" id="email-${donor._id}" value=${donor.email} placeholder="Email" disabled=true>
    <input type="text" name="phone" id="phone-${donor._id}" value=${donor.phone} placeholder="Phone" disabled=true>
    <input type="text" name="Bgroup" id="Bgroup-${donor._id}" value=${donor.Bgroup} placeholder="Blood Group" disabled=true>
    <input type="text" name="gender" id="gender-${donor._id}" value=${donor.gender} placeholder="Gender" disabled=true>
    <button onclick="handleEdit('${donor._id}')" class="edit">Edit</button>
    <button class="save" onclick="handleSave('${donor._id}')" >Save</button>
    <button onclick="handleDelete('${donor._id}')" class="delete">Delete</button> </div>`
        
    })
    document.getElementById("details").innerHTML=str

}

getData()



// edit input informations
function handleEdit(id){
    document.getElementById(`name-${id}`).disabled=false
    document.getElementById(`email-${id}`).disabled=false
    document.getElementById(`phone-${id}`).disabled=false
    document.getElementById(`Bgroup-${id}`).disabled=false
    document.getElementById(`gender-${id}`).disabled=false


}

// for save

async function handleSave(id){
    // alert(id) to check function wrkng or not

    let name=document.getElementById(`name-${id}`).value;
    let email=document.getElementById(`email-${id}`).value;
    let phone=document.getElementById(`phone-${id}`).value;
    let Bgroup=document.getElementById(`Bgroup-${id}`).value;
    let gender=document.getElementById(`gender-${id}`).value;

    console.log(name,email,phone,Bgroup,gender);

    let datas={id,name,email,phone,Bgroup,gender}
    let jsonData=JSON.stringify(datas);
    console.log(jsonData);

    const res=await fetch("http://localhost:3000/update",{
        method:"put",
        "Content-Type":"text/json",
        body:jsonData
    })
    const resData=await res.text();
    console.log(resData);
    getData();

    
}

async function handleDelete(id){
    // request
    // console.log(id);

    const res=await fetch("http://localhost:3000/delete",{
        method:"delete",
        headers:{"Content-Type":"text/plain"},
        body:id
    })

    // response
    const data=await res.text();
    // console.log(data);
    // ______________________________________________________
    // if(data=="Success"){
    //     alert("Successfully Deleted")
    //     getData()

    // }
    // else{
    //     alert("Failed to Delete")

    // }
    // _____________________________________________________

    // _____________________________________________________
    // data=="Success"?alert("Successfully Deleted"):alert("Failed")
    // getData()
    // -----------------------------------------------------

    // _______________________________________________________
    res.status==200?alert(data):alert(data);
    getData();
    // -------------------------------------------

}