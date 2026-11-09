
const foods=[
{id:1,name:'Nasi Ayam Geprek',price:12000,cat:'Makanan',img:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600'},
{id:2,name:'Mi Ayam',price:12000,cat:'Makanan',img:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600'},
{id:3,name:'Es Teh Manis',price:3000,cat:'Minuman',img:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600'},
{id:4,name:'Es Jeruk',price:12000,cat:'Minuman',img:'https://images.unsplash.com/photo-1513558161293-cdad765edc4d?w=600'},
{id:5,name:'Jus Alpukat',price:12000,cat:'Minuman',img:'https://images.unsplash.com/photo-1623065422902-30a2d299ebe4?w=600'},
{id:6,name:'Mi Ayam Bakso',price:12000,cat:'Makanan',img:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600'}
];
const rupiah=n=>'Rp '+Number(n).toLocaleString('id-ID');
function getCart(){return JSON.parse(localStorage.getItem('kantinCart')||'[]')}
function saveCart(c){localStorage.setItem('kantinCart',JSON.stringify(c))}
function addCart(id,qty=1){let c=getCart(),item=c.find(x=>x.id===id);if(item)item.qty+=qty;else c.push({id,qty});saveCart(c);alert('Menu berhasil ditambahkan ke keranjang!')}
function renderFoods(target='food-list',filter='Semua'){let el=document.getElementById(target);if(!el)return;el.innerHTML=foods.filter(f=>filter==='Semua'||f.cat===filter).map(f=>`<article class="food-card"><img src="${f.img}" alt="${f.name}"><div class="food-info"><h3>${f.name}</h3><div class="price">${rupiah(f.price)}</div><a class="btn" href="detail.html?id=${f.id}">Lihat Detail</a></div></article>`).join('')}
function cartTotal(){return getCart().reduce((s,x)=>s+x.qty*foods.find(f=>f.id===x.id).price,0)}
function renderCart(){let el=document.getElementById('cart-list');if(!el)return;let c=getCart();if(!c.length){el.innerHTML='<div class="empty">Keranjang kamu masih kosong.<br><a class="btn" href="menu.html" style="margin-top:15px">Pilih Menu</a></div>'}else{el.innerHTML=c.map(x=>{let f=foods.find(a=>a.id===x.id);return `<div class="cart-item"><img src="${f.img}"><div style="flex:1"><b>${f.name}</b><div class="price">${rupiah(f.price)}</div><span class="small muted">Jumlah: ${x.qty}</span></div><button class="btn-outline" onclick="removeItem(${x.id})">Hapus</button></div>`}).join('')}let total=document.getElementById('cart-total');if(total)total.textContent=rupiah(cartTotal())}
function removeItem(id){saveCart(getCart().filter(x=>x.id!==id));renderCart()}
function renderCheckout(){let el=document.getElementById('checkout-summary');if(!el)return;el.innerHTML=getCart().map(x=>{let f=foods.find(a=>a.id===x.id);return `<div class="summary-line"><span>${f.name} × ${x.qty}</span><b>${rupiah(f.price*x.qty)}</b></div>`}).join('')+`<div class="summary-line total"><span>Total</span><b>${rupiah(cartTotal())}</b></div>`}
function placeOrder(e){e.preventDefault();if(!getCart().length){alert('Keranjang masih kosong');return}localStorage.setItem('kantinLastOrder',JSON.stringify({items:getCart(),total:cartTotal(),date:new Date().toLocaleString('id-ID'),status:'Pesanan diterima'}));saveCart([]);location.href='pesanan.html'}
