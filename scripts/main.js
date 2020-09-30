'use strict'; //ne laisse rien passer

class ESDJob 
{

	constructor()
	{

		this._checkSetup();

		this.googleBtn =document.querySelector('#sign-in'); 
		this.snackbar = document.querySelector('#snackbar-alert');

		this._initFirebase();
		this._setupEvents();
	}

	_initFirebase()
	{
		this.auth = firebase.auth();
		this.db = firebase.firestore();

// 		const settings = {timestampsInSnapshots: true};
// 		this.db.settings(settings);

		this.storage = firebase.storage();
		//Initiates firebase auth and listen to auth state changes
		this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));

		var data = {
			message: 'server connected !',
			timeout: 5000
		};
	}

	_setupEvents()
	{
		this.googleBtn.addEventListener('click', this.signInWithGoogle.bind(this));
	}

	signInWithGoogle()
	{
		//sign in firebase using popup auth and Google as the identity provider
		var provider = new firebase.auth.GoogleAuthProvider();
		this.auth.signInWithPopup(provider);
	}

	onAuthStateChanged(user)
	{
		console.log('user:', JSON.stringify(user)); //transforme l'objet en string lisible dans la console
		if (user)
		{
			console.log("Connecté");
		}
		else
		{
			console.log("Déconnecté");
		}
	}

	_checkSetup()
	{
		if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
			window.alert('you have not configured and imported the Firebase SDK.' +
				'Please try again');
		}
	}

}

window.onload = function() {
	window.ESDJob = new ESDJob();
}
