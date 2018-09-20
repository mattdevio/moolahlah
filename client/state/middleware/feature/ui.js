/*----------  Custom Imports  ----------*/


/*====================================
=            uiMiddleware            =
====================================*/

const uiMiddleware = () => (next) => (action) => {
  next(action);
};

export default uiMiddleware;

/*=====  End of uiMiddleware  ======*/
