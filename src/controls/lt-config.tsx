import LTRouter from './lt-router';

/*
	LTCM-NOTE
	hmmm, this will be hold all the global variables that will be share between components
	I think the better way to do this is using redux
	but now isn't the right time I'll make decision to use redux when ltconfig getting bigger
*/


interface LTConfig {
  myRouter: LTRouter | null;
  myAPIs: Array < API >;
  customEvents: any;
}

interface API {
  name: string;
  url: string;
}

const ltConfig: LTConfig = {
  myRouter: null,
  myAPIs: [
    { name: 'api.blog', url: process.env.REACT_APP_API_URL + '/posts' },
    { name: 'api.contact', url: process.env.REACT_APP_API_URL + '/contact' }
  ],
  customEvents: {
    scrollHandler: function() {
      var scrollElements = document.getElementsByClassName("ScrollListener");
      var paddingTop = ((window as any).ltScrollerTopPadding !== undefined) ? (window as any).ltScrollerTopPadding : 200;
      Array.from(scrollElements).forEach((element) => {
        // Do stuff here
        var elementTop = element.getBoundingClientRect().top;
        //get all browser support - window inner height.
        var innerHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

        if (elementTop - innerHeight - paddingTop <= 0) {
          element.classList.remove("ScrollListener");
        }
      });
    }
  }
}

// Object.freeze(ltConfig)

export default ltConfig