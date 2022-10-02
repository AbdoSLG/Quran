
        // declare main varible
    let btn=document.querySelector(".btn")
    let data=document.querySelector(".data")
    let input=document.querySelector("input")
    let list=document.querySelector(".list")
    let voice =document.querySelector(".voice")
    let end =document.querySelector(".end")
    let select=document.querySelector("select")
    let op=document.querySelectorAll("select option")
    
    
    // fetch audio
    fetch("./audio.json")
    .then(res=>{
        return res.json();
    }).then(all=>{

        // console.log(all)


        select.addEventListener("click" , ()=>{


            all.forEach((e,i)=>{
                if(e.name==op[i].className && select.value==op[i].value){

                    voice.innerHTML=`<audio src="${e.recitation}" controls><audio/>`

                }
            })


        } )






    })


    // fetch text
    fetch("https://api.alquran.cloud/v1/quran/quran-uthmani")
        .then(res=>{
            return res.json();
        }).then(all=>{

            // console.log(all.data.surahs)

            ////// ///// /// // //****************** */ input option in select
            // all.data.surahs.forEach(e=>{
                
            //     list.innerHTML+=`<option class="${e.englishName}" value="${e.name}" >${normalize_text(e.name)}</option>`
                
            // })




        // take value form select 
        select.addEventListener("click",   function () {

            all.data.surahs.forEach(el=>{

                if(el.name==select.value){

                    data.innerHTML=""

                    el.ayahs.forEach((e,i)=>{

                        data.innerHTML+=`<span>${ e.text} (${i+1}) </span>`

                        data.setAttribute("name" ,el.englishName )

                    })
                    

                }

            }) 



            end.innerHTML="صدق الله العظيم"



            
        })



        // when search
        btn.onclick=function(){
    
            input.value=`سوره ${input.value}`
    
            if(input.value){

                all.data.surahs.forEach(el=>{

                    if(normalize_text(el.name)==(input.value)){

                        data.setAttribute("name" ,el.englishName )
    
                        data.innerHTML=""
    
                        el.ayahs.forEach((e,i)=>{
    
                            data.innerHTML+=`<span>${ e.text} (${i+1}) </span>`
    
                        })
    
                    }
    
                }) 



                fetch("./audio.json")
                .then(res=>{
                    return res.json();
                }).then(da=>{

                    
                    da.forEach(e=>{

                        if(data.getAttribute("name")==e.name){
                            voice.innerHTML=`<audio src="${e.recitation}" controls><audio/>`
                        }
                    })


                })

                end.innerHTML="صدق الله العظيم"

            }
    
            input.value=``
    
        }


        })


//  ** /// *** // *    remove التشكيل
        normalize_text = function(text) {

            //remove special characters
            text = text.replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g, '');
            
            //normalize Arabic
            text = text.replace(/(آ|إ|أ)/g, 'ا');
            // text = text.replace(/(ة)/g, 'ه');
            text = text.replace(/(ئ|ؤ)/g, 'ء')
            // text = text.replace(/(ى)/g, 'ي');
            
            //convert arabic numerals to english counterparts.
            var starter = 0x660;
            for (var i = 0; i < 10; i++) {
                text.replace(String.fromCharCode(starter + i), String.fromCharCode(48 + i));
            }
            
            return text;
            }