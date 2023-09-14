//express.js--> api isteklerini yazabilmemi saglayan bir js kutuphanesi
//webapi dosyasını bir backend(server) gibi calıstırıyorum

//node js i direkt kullanıyorsak express kutuphanesini dahil ederek baslıyorum
const express=require("express"); //kutuphaneyi required ederek express e aktardım
const cors=require("cors"); //corsu yğklediğim paketten yakalım
//express kutuphanesi direkt olarak kullanılamıyor, dönüştürmemiz lazım. kutuphaneyi degiskene atıyoruz.
const app=express();

app.use(express.json()); //json formatı kullandıgımızı belirtmemiz gerkeiyor.
app.use(cors()); //cors politikasını uyguladım

const todos=[];
let id=0;



//api türü get olacak
app.get("/api/hello",(req,res)=> {  // /api/hello browser'ın devamına eklenecek. api olarak baslamak best practic
    res.json({message: "Api call is succesfull"}) //200 status koduyla kullanıcya dönecek
});



// app.get("/api/todos/1",(req,res)=>{
//     res.json({
//         userId:1,
//         id: 1,
//         title:"deneme",
//         completed: false
//     });
// })

//get ile kayıt işlemi
// app.get("/api/todos/create/:value", (req,res)=>{ //yazdıgım deger value ya gelecek
//     const value=req.params.value;

//     id++;

//     const todo={ //objeye cevrdim,(objeler süslü parantez ile yazılır value-key olarak belirtilir), objede bir kayıt bulunur, listede birden fazla kayıt bulunabilir
//         id:id,
//         title:value,
//         completed: false,
//         date: new Date()
//     }

//     todos.push(todo);
//     res.json({message: "Create is successful"});

// })

//POST ile api metodu
app.post("/api/todos/create",(req,res)=>{
    const body = req.body;  //post istekleri api içerisinde bir tane obje gönderebilir. bu objeler body içerisindedir.
    id++;
    const data={
        id:id,
        title:body.title, //parametreden obje olarak bir deger gelsin, objenin içerisindeki title yakaladık
        isCompleted: false,
        date: new Date()
    }

    todos.push(data);
    res.json({message: "Create is successful"});
} )

//get ile listeleme işlemi
app.get("/api/todos",(req,res)=>{
    res.json(todos);
});

//get metodu ile silme isteği 
app.get("/api/todos/remove/:id", (req,res)=>{ //api adresine id ile birlikte istek attıgım zaman kayıt silinecek.
    const id=req.params.id; //get isteği yapıyorsam adres cubuguna yazdıgım id yi bu sekilde yakalayabiliyorm
    const index=todos.findIndex(p=>p.id===+id); //-1 dönerse kaydı bulamadı demektir
    if(index===-1) res.status(500).json({message:"the record you want to delete was no found!"});
    else{
        todos.splice(index,1);
        res.json({message:"Remove is successfull"})
    }

});

app.post("/api/todos/update", (req,res)=>{ //post isteği oldugu için karsı taraftan obje istiyoruz. objede de id ve title istedik--id yi sorgulamak için title ı degiştirmek içn
    const body=req.body;
    const index=todos.findIndex(p=>p.id===+body.id);//p.id yi body.id içerisinde ara
    if(index===-1) res.status(500).json({message: "This record you want to delete was no found"}); //hata kodu 500 yaptık
    else{
        todos[index].title=body.title;
        res.json({message: "Update is successful"});
    }
})

//hangi portta çalısagını soyluyorum
app.listen(5000,()=>console.log("WebApi Application is running"))