export function checkEquivalence(objA,objB){
  if(typeof objA !== typeof objB){
    return false;
  }
  else if( typeof objA === 'string' ){
    return objA.trim() === objB.trim();
  }
  else if( Array.isArray(objA)){
    if(objA.length  !== objB.length){
      return false;
    }else{
      const lenFilteredObj =  objA.filter(ele => objB.findIndex(item => checkEquivalence(item,ele))>-1 ); 
      return lenFilteredObj.length === objB.length;
    }
  }else {
    const arrA = Object.keys(objA);
    const arrB = Object.keys(objB);
    if(arrA.length !== arrB.length){
      return false;
    }else{
      return arrA.filter(ele => checkEquivalence( objA[ele],objB[ele])).length === arrA.length ? true : false ;
    }
  }
}
export function areEquivalent(objA,objB){
  const tempObjA = objA.map(ele => ele.trim());
  const tempObjB = objB.map(ele => ele.trim());
    if(tempObjA.length !== tempObjB.length){
        return false;
    }
    const tempArr =  tempObjA.filter(ele => tempObjB.indexOf(ele) > -1 );
    return tempArr.length === tempObjA.length ? true : false;
    
}
export function stringifyQueryParams(params) {
      return Object.keys(params)
        .reduce((all, key) => {
          if (params[key] !== null && params[key] !== '') {
            all.push(`${key}=${params[key]}`);
          }
          return all;
        }, [])
        .join('&');
    }