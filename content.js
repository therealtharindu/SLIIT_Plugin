document.addEventListener('keyup',onKeySpacePress);

function onKeySpacePress(e){

      var x = document.activeElement.tagName;
   

      if(x == 'DIV'&& document.hasFocus() && e.keyCode == 32){
       

          let nodeList = document.querySelectorAll('#mydiv')
          
          for(let i=0; i<nodeList.length; i++){
            
            
            nodeList[i].setAttribute('spellcheck', false)
           
            
            wordList = nodeList[i].innerText.trim().replace(/^\s+|\s+$/g,'').split(/\s+/);
           
            
            for(let j=0; j<wordList.length; j++){
             fetch('http://127.0.0.1:5000/api/spellchecking',{
                     method:'POST',
                     headers:{
                       'Content-Type':'application/json'
                     },
                     body: JSON.stringify({
                       "word": wordList[j].toString()
                     })
                   }).then(res => {
                     return res.json()
                   })
                   .then(data => {
                     if(data == false){
                       console.log('this word is incorrect :'+wordList[j])
                       
                       
                       var element = nodeList[i]
                       var originalHtml = element.innerHTML;
                       var cleardHTMl = originalHtml.replace(/&nbsp;/g, '');
                       var newHtml = cleardHTMl.replace(new RegExp(wordList[j], "g"), wordList[j].fontcolor("red"));
                       element.innerHTML = newHtml;
                       
                       
                       
                      
                     }
                   })
                   .catch(error => console.log('ERROR!!' +error))
                   
   
            }
   
            
            
           
          }
           
   
           
         


      }


      
    }



// textarea.addEventListener('change',onchange);

// function onchange(){
//   let textarea = document.getElementById('textarea')
//   console.log(textarea.value)
  
// }










