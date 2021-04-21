import LTRouter from './lt-router';

/*
	LTCM-NOTE
	hmmm, this will be hold all the global variables that will be share between components
	I think the better way to do this is using redux
	but now isn't the right time I'll make decision to use redux when ltconfig getting bigger
*/


interface LTConfig {
	myRouter : LTRouter | null
	myAPIs 	 : Array<API>
}

interface API{
	name: string;
	url: string
}

const ltConfig : LTConfig = {
	myRouter: null,
	myAPIs : [
		{name: 'api.blog', url: process.env.REACT_APP_API_URL+'/posts'}
	]
}

// Object.freeze(ltConfig)

export default ltConfig