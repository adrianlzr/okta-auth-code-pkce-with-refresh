const codeChallenge = 'vTbyQmwiR5yfM3HBzNofAix9V7RN69PdqrL51TDr3Ao';
var issuer = "https://adrian.oktapreview.com/oauth2/default"
var redirectUri = window.location.origin+'/callback/index.html'

var event = new Event('expired');
var tokens = JSON.parse(localStorage.getItem("tokens"));
if(tokens){
    console.log(tokens)
    var expires = JSON.parse(localStorage.getItem("expires_in"));
    setTimeout(function(){
      document.dispatchEvent(event)
    }, expires * 1000)
}else{
    const baseUrl = `${issuer}/v1/authorize?`;
    const reqUrl = `client_id=0oalodlmorsn9KQ1y0h7&response_type=code&response_mode=query&scope=openid profile&state=state&nonce=nonce&redirect_uri=${redirectUri}`;
    const challengeUrl = `&code_challenge_method=S256&code_challenge=${codeChallenge}`
    window.location.replace(baseUrl+reqUrl+challengeUrl);  
}

document.addEventListener('expired', function(){
    var check = confirm('Session has expired. Need a new one?')
  
    if(check){
        const baseUrl = `${issuer}/v1/authorize?`;
        const reqUrl = `client_id=0oalodlmorsn9KQ1y0h7&response_type=code&response_mode=query&prompt=none&scope=openid profile&state=state&nonce=nonce&redirect_uri=${redirectUri}`;
        const challengeUrl = `&code_challenge_method=S256&code_challenge=${codeChallenge}`
        window.location.replace(baseUrl+reqUrl+challengeUrl);  
    }else{
        window.alert('Make sure to refresh the page to obtain a new token.')
    }
})
