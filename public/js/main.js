function onSubmit(e){
    e.preventDefault();

    document.querySelector('.message').textContent='';
    document.querySelector('#image').src='';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;
    if(prompt === ''){
        alert('Please add some text');
        return;
    }
    generateImageReq(prompt,size);
}

async function generateImageReq(prompt,size){
    try {
        const response = await fetch('/openai/imgenerate',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                prompt,
                size
            })
        })
        if(!response.ok){
            throw new Error('Could not generate this Image')
        }
        const data = await response.json();
        console.log(data);
        const imageUrl = data.data;
        document.querySelector('#image').src= imageUrl;
    } catch (error) {
        document.querySelector('message').textContent= error;
    }
}



document.querySelector('#image-form').addEventListener('submit',onSubmit);