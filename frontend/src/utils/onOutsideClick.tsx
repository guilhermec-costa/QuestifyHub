const handleOutsideClick = (closeCallback:Function, event:Event, excludeDependencies:HTMLElement[]|undefined) => {
    const whoCalled = event.target as Node;
    if(excludeDependencies?.every(dependencie => !dependencie?.contains(whoCalled))) {
        closeCallback();
    };
};

export default handleOutsideClick;
