
const handleOutsideClick = (closeCallback:Function, event:Event, excludeDependencie:HTMLElement) => {
    const whoCalled = event.target as Node;
    if(!excludeDependencie.contains(whoCalled)) {
        closeCallback();
    };
};

export default handleOutsideClick;
