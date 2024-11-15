const navBtn=document.getElementById("nav-btn");
navBtn.addEventListener('click',()=>{
    document.getElementById('navbar').classList.toggle('hidden')
})

const baskitBtn=document.getElementById('baskit-btn')
baskitBtn.addEventListener('click',()=>{ 
    document.getElementById("cart").classList.toggle('hidden')
})
const close=document.getElementById('close')
close.addEventListener('click',()=>{
    document.getElementById("cart").classList.toggle('hidden')
})

let newdata;
let baskit=JSON.parse(localStorage.getItem("data") )|| [];
let total;
fetch("./data.json").then( (response) => response.json()).then( (data)=>{
    newdata=data;
    DisplayFeature()
    DisplayProduct()
    DisplayCart()
})

function DisplayFeature(){
    const feature=document.getElementById('feature');
    let data=newdata.filter(p => p.categorie ==='feature');
    data.map((item) =>{
        const card=document.createElement('div');
        card.className='bg-primary rounded-md border-2 border-slate-50 grid gap-4';
        card.innerHTML=`<div class="w-full h-[300px] overflow-hidden md:h-[250px]">
                        <img src="${item.img}" alt="" class="w-full h-full object-cover">
                    </div>
                    <div class="px-4 grid gap-3 py-2 pb-6">
                        <h1 class="text-secondary text-lg font-semibold capitalize">${item.title}</h1>
                        <p class="text-secondary">${item.dis}</p>
                        <div class="flex justify-between items-center">
                            <h1  class="text-accent text-lg font-semibold">Rs:${item.price}</h1>
                            <a href="#" class="bg-accent py-2 px-3 text-sm rounded-sm shadow-md hover:shadow-2xl hover:shadow-[#2ee69c71] text-primary font-medium transition-colors ease-linear" onclick="AddToCart(${item.id})">
                                Add To Cart
                            </a>
                        </div>
                    </div>`
                    feature.appendChild(card)
    })
    
    
}

function DisplayProduct(){
    const product=document.getElementById('product');
    let data=newdata.filter(p => p.categorie ==='product');
    data.map((item) =>{
        const card=document.createElement("div");
        card.className='bg-primary rounded-md border-2 border-slate-50 grid gap-4'
        card.innerHTML=`<div class="w-full h-[300px] overflow-hidden md:h-[250px]">
                    <img src="${item.img}" alt="" class="w-full h-full object-cover">
                </div>
                <div class="px-4 grid gap-3 py-2 pb-6">
                    <h1 class="text-secondary text-lg font-semibold capitalize">${item.title}</h1>
                    <div class="flex justify-between items-center">
                        <h1  class="text-accent text-lg font-semibold">Rs:${item.price}</h1>
                        <a href="#" class="bg-accent py-2 px-3 text-sm rounded-sm shadow-md hover:shadow-2xl hover:shadow-[#2ee69c71] text-primary font-medium transition-colors ease-linear" onclick="AddToCart(${item.id})">
                            Add To Cart
                        </a>
                    </div>
                </div>`
                product.appendChild(card)
    })
    
}

function AddToCart(id){
    const product=newdata.find(p => p.id ===id);
    const cart=baskit.find(p => p.id===id);
    if(cart)return
    else{
        baskit.push({...product,qty:1})
    }
    baskit=baskit.filter(p => p.id !==0);
    localStorage.setItem("data",JSON.stringify(baskit))
    DisplayCart()
    console.log(baskit);
    
}
function DisplayCart(){
    total=baskit.reduce( (acc,p)=> acc + p.price * p.qty,0)
    let count=baskit.reduce((acc,p)=> acc+p.qty,0)
    const showCart=document.getElementById("show-cart");
    showCart.innerHTML="";
    baskit.map((item)=>{
        const card=document.createElement("div");
        card.className='border-b-2 border-b-slate-100 flex justify-between mt-6'
        card.innerHTML=`<div class="flex gap-4 items-center">
                        <img src="${item.img}" alt="" class="w-16 h-16">
                        <div class="grid gap-1">
                            <h1 class="text-secondary text-lg font-medium">${item.title}</h1>
                            <h1 class="text-accent text-lg font-medium">Rs:${item.price}</h1>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="cursor-pointer self-end" onclick="Delete(${item.id})">
                            <img src="./image/baseline-close-24px.png" alt="" class="w-6">
                        </span>
                        <div class="flex gap-4 mt-2 py-1 px-4 items-center">
                            <button class="bg-accent rounded-sm shadow-md cursor-pointer" onclick="Minus(${item.id})">
                                <img src="./image/baseline-arrow_left-24px.png" alt="">
                            </button>
                            <span class="text-secondary font-medium" id="qty"> ${item.qty} </span>
                            <button class="bg-accent rounded-sm shadow-md cursor-pointer" onclick="Pluse(${item.id})">
                                <img src="./image/baseline-arrow_right-24px.png" alt="">
                            </button>
                        </div>
                    </div>`
                    showCart.appendChild(card)
    })
    if(count ===0){
        document.getElementById('empty').style.display='flex'
        document.getElementById("count").innerHTML=count;
    }else{
        document.getElementById("count").innerHTML=count;
     
    }
    document.getElementById('total').innerHTML=`Rs:${total}`
}

function Delete(id){
    baskit=baskit.filter(p => p.id !==id);
    localStorage.setItem("data",JSON.stringify(baskit))
    DisplayCart()
}

function Minus(id){
    let cart=baskit.find(p => p.id ===id);
    if(cart){
        if(cart.qty===0)return
        else{
            cart.qty -=1;
        }
    }
    DisplayCart()
    baskit=baskit.filter(p => p.qty !==0);
    localStorage.setItem("data",JSON.stringify(baskit))
    Update(id);
}

function Update(id){
    const item=baskit.find(p => p.id===id);
    if(item==undefined){
        DisplayCart()
    }else{
        document.getElementById('qty').innerHTML=item.qty
    }
}

function Pluse(id){
    const cart=baskit.find(p => p.id===id);
    if(cart){
        cart.qty +=1;
    }
    DisplayCart()
    baskit=baskit.filter(p => p.qty !==0);
    localStorage.setItem("data",JSON.stringify(baskit))
    Update(id);
}

function Checkout(){
    alert("Thank You For Shopping!")
    baskit=[];
    localStorage.setItem("data",JSON.stringify(baskit)) 
    DisplayCart()
}