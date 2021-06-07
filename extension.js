const vscode = require("vscode")
const  googleIt = require('google-it');

/**
 * @param {vscode.ExtensionContext} context
 */

 async function activate(context) {

	var input,foo,article,bar;

 


  let disposable = vscode.commands.registerCommand(
    "HeyGoogle.SearchiT",
    async () =>{
    

	input = await vscode.window.showInputBox();
	// console.log(input);

	await googleIt({'query': `${input}`}).then(results => {

//    console.log(results);
   foo = results;
		bar = foo.map((index) => {
			return {
			label: index.title,
      		detail: index.snippet,
      		link: index.link,
		}
			
		})
		return bar;
	 }).then(res => {
		//  console.log(res);
		 if(res.length == 0) {
			vscode.window.showInformationMessage("Please enter something");
		 } 

		article = vscode.window.showQuickPick(res, {
			matchOnDetail: true,
		  })
		// console.log(article);  
		return article;
	 }).then(res => {
		// console.log(res);
		// if(res == undefined) {
			// console.log(res);
			vscode.env.openExternal(res.link);
		// }	
	 }).then(() => {

		vscode.window.showInformationMessage("Hope you got it! 😜");
	 })
	 .catch(e => {
		//  console.log(e);
		 if(e == "TypeError: Cannot read property 'link' of undefined") {
			vscode.window.showInformationMessage("Sorry, if there is no match :(");
		} else {
			vscode.window.showInformationMessage("error: "+e);
		 }
		//  console.log(e);
	})

	  
    }
  )

  context.subscriptions.push(disposable)


  
}
exports.activate = activate

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}

// juyesuuqiw7zjsu2sg4oeyupin225vvvgnrmhrtppegc6vnthsea