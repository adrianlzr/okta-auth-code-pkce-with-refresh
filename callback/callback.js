const urlParams = new URLSearchParams(window.location.search);
const codeParam = urlParams.get('code');
const errorParam = urlParams.get('error');
const codeVerifier = 'pyhaPjYRiiC0zSnFSlkQUYnzqpSCAqlVYLQrwvg84VzBtzBxDIuYYPROndxEycJISaNdN3R4HrTamBYKXDCCoIWYEejviVKnYOvCZNUOWKyPTfyzOJQUOWjyHZzYhfA3'
var redirectUri = window.location.origin+'/callback/index.html'
const issuer = "https://adrian.oktapreview.com/oauth2/default"
params = {
    'client_id': '0oalodlmorsn9KQ1y0h7',
    'code_verifier': codeVerifier,
    'grant_type':'authorization_code',
    'code': codeParam,
    'redirect_uri':redirectUri
  }
  const data = Object.keys(params).map((key) =>{
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');  

async function postToken(){
    let resp = await fetch(`${issuer}/v1/token`, {
        method:'POST', 
        mode: 'cors',
        headers: new Headers({
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        credentials:'omit',
        body: data
    
    })
    let res = await resp.json();
    return res
  }
if(errorParam){
  console.log(errorParam);
  console.log('Error. This should have returned me to the custom error URL set in Okta.');
}else{
    if(codeParam){
        postToken().then(res => {
            if("id_token" in res){
              console.log('it is here');
              localStorage.setItem("tokens",JSON.stringify(res));
              localStorage.setItem("expires_in",JSON.stringify(res.expires_in));
              window.location.replace(window.location.origin)
            }
            if('error' in res){
              console.log(res)
              return;
            }
            console.log('Unforseen event. Oups? Line 63, callback.js.')
        })
    }
    else{
        console.log('Nothing')
    }

}

