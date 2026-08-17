(()=>{
  const IMG='data:image/webp;base64,UklGRrw2AABXRUJQVlA4ILAyAADwLgCdASrqAicBPpFKnUklo6KhKquJQAgAsBIJZACdMoEP+QZyxEpeBkFI4uJgRuJVfwHAf8tW3xDKfV/f9EP55Ndqj73dP18TWK3/+v9I5pVfE0eNG50Qq4+0SuIYQfE0mv0xv9+v66CtV33bhtnkRPBD/Ph8OZnyl+WecpMg+L3hIk/YCw8lRuDwHWDOerYMPpX9CnqcXINuGP6B7+P7u+e/xENeHcYfZ5+qKjg71BYJOv0TS8ZNG7XftsrOFun5H5mQb1xXtoWfYH58dRk1jqWr6kTUGxPEHUThPvv7N/RgH19YwMpC/5n9XMcx/jkdeMPn4dRvUYEbN1fZ4INLprXbv1/0P7+ULl85s/0OqX0Bq3U0/qM3q2RDL0hWMSt1ayWwL4Qj+8l9oPzD5+78/G+fQusR5C53qLXj2k6v3EM8YQvXFG0WyEcNFgQ/gm5W8Z6LqxJ4SZPIreJV8DUbAsZ6D4kycUIYTcN/f6p8h9q9WJmfIPl8b4cBevLzjv7VEs52Gd1oH6Qv5Hq+5DukJtIVjwjq4o0NYvS1Qwrb+ugQOBMbmuLU64Q8T1OqM20KMaoBdRgNVV/fz6n4B86lXZpcOzAeGjml2bvuQNCjUrGRVoLtg1DmfhUHk1KQ0s4oxXBW9gZsTzz/OD2yqvvy62PDJ8B7jX2SnaWKmWP7R4g1IF4dQyvvFfYXMiwYsPpTYDDk9kqQ6hI2t+GmlFuZuWlujsY0W3nC0ts+IcTUzBFUBpu4Bp2eR7y9AGrl1KEWBXjuuuNAhBKBdcFd1lxad1uYsrDc0TlQtQRt2N/OQmRaBjISKMwZNkhaw4ETvxa1oHTSnAAZhAa/sBm6YiF5I5zz5YtElwGkFBCKNBkvoMR7Ml9O4QfvWEtpsMLpmLaXRWS6Xt5K+dCxilRmHtijKlMbOQrgGmK4dxdwYb+17VaDW23HqXLnYGtgi5xgpJLTIelPsHMoXRHepbqIgXmWCVeTJOinDvLT4e/oAoMHbmRiayw4Nho/4nrHj+5r5OCa1a9xzscMwHV/kYz1f2a9dUtOuu+QFAx99lC5o+h01q4DdYj+rRmFzoL7Bz2moxKfO5YjBlDwmQB+ua29JNDZjAo6cCDcjFkWoGE3TWbOW9mXrKvbzHJm9wqP8fzUSMQKVqsY/RQnkzmIwgGA9aJl8eWZfR9g4s7m5m4WfT/48mXNoOtNsEgIAHzctXcBV4M5oW1x0eiBoRBhXrqo6dcIEPdTGfoDtRGoNLWLndAoPkRSFHuukNvkdLA9+SoSgCuUJ2Gh6aPBzDLi2Ff7y00e8z4oHyYEidjIyq7c4OWaavMVRZb/qw04ofjhSOzRti8f2KfOJESoH1b1y0N8UwPoMkJlDaTiF53TIzOeBhG50xZ4fYMdbf+2f4jQXqkv6+U6v8HTwOTrAxf5YMuNJhMibd5vF5qHEE4jdPYuhfhWxFaViVYTlKWEE7njm6kZNczo8w4s9KfE7V/wXBh30CiUYrYTdY+KfW5Ro4m1Q1moj82aT6q0WQ8yQL8UlIrOpFo6KZWbP7xZQtqvO0VZaTXeKN1tpx1mBJyhzMb5jC4yE4QzQAGm5qoOg5YeHKdNOdct3T1wxxdO6yMqgtdpgGDuOqGRqz9RY9V+/xmTMx5ooQYT/d6EeS5HQ6Pyql/QIbmkLtBKWXNaSyR/HKrYj1HoBGqBw7AC8fa8J3q4mCJaYYvUTkckPoxlQBpVzsfr1kIAld/PuF9m0Z5ST4xBvsWY6sf7ow/qLg5fG1QYBNm7QfkhEeGo5y7C88+QRLH7m2yZBuEPrh3Z7SQmYsaXyj1pYIzyAO+NTImx2IqdOQDH3ALMZmp0qhmSjNtQRjrJjKT/c/p/Z8WBsMHfc9EhGbpyKpWE1/olG3ITevYFo9tR0piVwiXVsbKR7KO/9UBKjiJ82zDtTBZFxaFRcQZR7veqhIHh6ZiQpQNEvbFu4l/E8uPgKvrguHjQJDBLaXgDSqwjXF+ylbc5UyGfzb3KNT5YsKKRAIP4kw0fOT1iDJIxac+W1pNtDWWcgYP7BnOVEL7f0AviWc9eOSAdW1al1SZVynZZC+0rXer0m2hvQBsJ4JLy9Kd3v0RHeLdzJYbLV3BB4sjdRzCu3ohb67x+M2uC03CjFiKUlDAkn/tpdmfcb8Q9PL6tA6b5Y1AZaBGJZTs/G8Ou6RtGT0wbA2HVz9SBx7dkQAA==';
  const CREDIT='Yesterday — approved Shoosh-supplied venue image';
  function apply(root=document){
    const nodes=[];
    if(root.nodeType===1 && root.matches?.('[data-media="yesterday"]')) nodes.push(root);
    root.querySelectorAll?.('[data-media="yesterday"]').forEach(n=>nodes.push(n));
    nodes.forEach(el=>{
      el.style.backgroundImage=`url("${IMG}")`;
      el.style.backgroundSize='cover';
      el.style.backgroundPosition='center';
      el.style.backgroundRepeat='no-repeat';
      el.classList.add('destination-photo-active');
      el.dataset.destinationResolved='1';
      el.dataset.destinationCredit=CREDIT;
      el.dataset.destinationSource='shoosh-approved';
    });
  }
  function start(){
    apply();
    new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)apply(n)}))).observe(document.body,{childList:true,subtree:true});
    setTimeout(apply,250);
    setTimeout(apply,900);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
