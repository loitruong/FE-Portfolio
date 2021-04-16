import LTRouter from './lt-router';

/*
	LTCM-NOTE
	hmmm, this will be hold all the global variables that will be share between components
	I think the better way to do this is using redux
	but now isn't the right time I'll make decision to use redux when ltconfig getting bigger
*/


interface LTConfig {
	myRouter : LTRouter
}

const ltConfig : LTConfig | any = {

}

// Object.freeze(ltConfig)

export default ltConfig