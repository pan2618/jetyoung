// Swiper 初始化
new Swiper('.hero-swiper', {loop:true, autoplay:{delay:4000}, navigation:{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev'}});
new Swiper('.product-swiper', {slidesPerView:4,spaceBetween:24,breakpoints:{0:{slidesPerView:1.4},576:{slidesPerView:2.2},768:{slidesPerView:3},992:{slidesPerView:4}}});
new Swiper('.brand-swiper', {loop:true, autoplay:{delay:3000}, pagination:{el:'.swiper-pagination',clickable:true}});

// 類別篩選（示例，需給每張 card 加 data-category）
document.querySelectorAll('.category-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.category-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    document.querySelectorAll('.product-swiper .swiper-slide').forEach(slide=>{
      slide.style.display = (cat==='all'||slide.dataset.cat===cat)?'block':'none';
    });
  });
});

// 加入購物車
const cart = [];
document.querySelectorAll('.add-to-cart').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const title = btn.dataset.title;
    const price = parseFloat(btn.dataset.price);
    cart.push({title,price});
    updateCartUI();
  });
});

// 打開 / 關閉購物車側欄
const sidebar = document.getElementById('cartSidebar');
const backdrop = document.getElementById('sidebarBackdrop');
document.getElementById('cartBtn').onclick = ()=>{sidebar.classList.add('open'); backdrop.classList.add('show');};
document.getElementById('closeCart').onclick = ()=>{sidebar.classList.remove('open'); backdrop.classList.remove('show');};
backdrop.onclick = ()=>{sidebar.classList.remove('open'); backdrop.classList.remove('show');};

// 更新 Cart UI & 徽章
function updateCartUI(){
  document.getElementById('cartCount').textContent = cart.length;
  const body = document.getElementById('cartItems');
  body.innerHTML = cart.map(i=>`<div class="d-flex justify-content-between border-bottom py-2">
    <span>${i.title}</span><span>$${i.price.toFixed(2)}</span></div>`).join('');
}
