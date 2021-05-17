import React from 'react';

export default class Error extends React.Component<{},{hasError:boolean}> {
  constructor(props:any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error:any, info:any) {
    this.setState({ hasError: true });
    this.logError(error, info);
  }

  logError(error:any, info:any){
  	console.log(error);
  	console.log(info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}