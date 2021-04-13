import LTRouter from './lt-router';

/*
	LTCM-NOTE
	hmmm, this will be hold all the global variables that will be share between components
	I think the better way to do this is using redux
	but now isn't the right time I'll make decision to use redux when ltconfig getting bigger
	Also, Im freezing this object here. There shouldn't be any mutation after LTConfig defined
*/


interface LTConfig {
	myRouter : LTRouter
}

const ltConfig : LTConfig = {
	myRouter : new LTRouter()
}

Object.freeze(ltConfig)

export default ltConfig