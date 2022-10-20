

export const trasformText = ( html, cut = 0 ) => {

    if( !html ) return '';

    const description = new DOMParser().parseFromString(html, "text/html");
    const descriptionTransformed = description.body.textContent;
    if( cut ){
        return descriptionTransformed.slice(0, cut) + '...';
    }

    return descriptionTransformed;
        
}