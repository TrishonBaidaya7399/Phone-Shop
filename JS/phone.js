

const notFoundMessage = 'No phones found.';
const loadPhone= async (searchText='a', isShowAll)=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones= data.data;
    if(phones.length===0){
        toggleLoadingSpinner(false);
        const notFound= document.getElementById('not_found');
        notFound.classList.remove('hidden')
        const p= document.createElement('p')
        p.innerHTML=`<p id="#not_found" class="text-red-500">Search result for "${searchText}" not found! Search for any other model. </p>`
        notFound.appendChild(p);
        setTimeout(() => {
            notFound.removeChild(p);
            
        }, 3000);
    }else{
        displayPhones(phones, isShowAll)
        const notFound= document.getElementById('not_found');
        notFound.classList.add('hidden')
    }
}
const displayPhones=(phones, isShowAll)=>{
const phoneContainer= document.getElementById('phone-container')
// clear phone container before adding new card
phoneContainer.textContent='';
// display show all button if there are more than 9 phones
const showAllContainer= document.getElementById('show-all-container');

if(phones.length>9 && !isShowAll){
    showAllContainer.classList.remove('hidden');
}
else{
    showAllContainer.classList.add('hidden');
}
//display only 9 items if showall is false
if(!isShowAll){
    phones= phones.slice(0,9);
}
phones.forEach(phone=>{
    //1. create a div
    const phoneCard=document.createElement('div');
    phoneCard.classList='card  shadow-xl mx-auto border-2 border-gray-200';
    phoneCard.innerHTML= `
    <figure class="mx-7 mt-7 py-10 bg-teal-50 rounded-xl">
    <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p class="w-[80%]">There are many variations of passages of available, but the majority have suffered</p>
    <h2 class="card-title">$999</h2>
    <div class="card-actions">
      <button onclick="handleShowDetail('${phone.slug}')" class="btn rounded-lg btn-accent bg-blue-700 text-white ">Show Details</button>
    </div>
  </div>
    ` 
    phoneContainer.appendChild(phoneCard);
});
toggleLoadingSpinner(false);
}
loadPhone();

//<------------------------------------ search handler----------------------------------->
const handleSearch = (isShowAll) =>{
    const searchField= document.getElementById('search-field');
    const searchText= searchField.value;
    if(searchText){
        loadPhone(searchText, isShowAll);
        toggleLoadingSpinner(true);
        searchField.value= '';
    }
   

}
const toggleLoadingSpinner= (isLoading) =>{
     const loadingSpinner= document.getElementById('loading-spinner');
     if(isLoading){
         loadingSpinner.classList.remove('hidden')
        }else{
         loadingSpinner.classList.add('hidden')
        }
    }
//<------------------------------------ handler show detail ----------------------------------->
const handleShowDetail = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);

}
const showPhoneDetails = (phone) =>{
    //show the modal
    // const phoneName= document.getElementById('phone-name');
    // phoneName.innerText=(phone.name)
    show_details_modal.showModal();
    const showDetailContainer = document.getElementById('show_detail_container');
    showDetailContainer.innerHTML=
    `<figure class="mx-3 my-3 py-10 bg-teal-50 rounded-xl">
    <img src="${phone?.image}" alt="" class="rounded-xl mx-auto" />
    </figure>
    <h3 id="phone-name" class="font-bold text-[25px] ">${phone?.name || 'Not Defined'}</h3>
    <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <h3 class="text-[15px] mb-[16px]"><span class="font-bold text-[15px]">Storage:</span> ${phone?.mainFeatures?.storage || 'Not Defined'}</h3>
    <h3 class="text-[15px] mb-[16px]"><span class="font-bold text-[15px]">Display Size:</span> ${phone?.mainFeatures?.displaySize || 'Not Defined'}</h3>
    <h3 class="text-[15px] mb-[16px]"><span class="font-bold text-[15px]">Chipset:</span> ${phone?.mainFeatures?.chipSet || 'Not Defined'}</h3>
    <h3 class="text-[15px] mb-[16px]"><span class="font-bold text-[15px]">Memory:</span> ${phone?.mainFeatures?.memory || 'Not Defined'}</h3>
    <h3 class="text-[15px] mb-[16px]"><span class="font-bold text-[15px]">Slug:</span> ${phone?.slug || 'Not Defined'}</h3>
    <h3 class="text-[15px] mb-[16px]"><span class="font-bold text-[15px]">Release Date:</span> ${phone?.mainFeatures?.releaseDate || 'Not Defined'}</h3>
    <h3 class="text-[15px] mb-[16px]"><span class="font-bold text-[15px]">Brand:</span> ${phone?.brand || 'Not Defined'}</h3>
    <h3 class="text-[15px] mb-[16px]"><span class="font-bold text-[15px]">GPS:</span> ${phone?.others?.GPS || 'Not Defined'}</h3>
    `
    console.log(phone);
}
//<------------------------------------ handler show all ----------------------------------->
const handleShowAll = () =>{
    handleSearch(true);
}