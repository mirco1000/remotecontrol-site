(() => {
const translations = {
'Politique de confidentialité':'Privacy Policy',
'Aller au contenu':'Skip to content','Fonctionnalités':'Features','Découvrir l’app ↗':'Discover the app ↗','●   VOTRE NOUVELLE TÉLÉCOMMANDE':'●   YOUR NEW REMOTE CONTROL','Votre écran.':'Your screen.','Vos envies.':'Your way.','À vous le contrôle.':'You’re in control.','La télécommande fait place à votre téléphone.':'Your phone becomes your remote.','TV, photos, vidéos, musique : découvrez RemoteControl.':'TV, photos, videos, music: discover RemoteControl.','Explorez RemoteControl':'Explore RemoteControl','DU PETIT ÉCRAN AU GRAND.':'FROM YOUR PHONE TO THE BIG SCREEN.','UNE APP. PLUS DE POSSIBILITÉS.':'ONE APP. MORE POSSIBILITIES.','Le salon passe':'Your living room,','en mode':'powered by','Changez de programme.':'Change the channel.','Partagez un souvenir.':'Share a memory.','Donnez le ton à votre soirée.':'Set the mood for your evening.','Prenez les commandes.':'Take control.','Contrôlez votre télévision depuis votre téléphone.':'Control your TV from your phone.','02 / PHOTOS':'02 / PHOTOS','Voyez plus grand.':'Think bigger.','Partagez vos photos sur votre télévision et revivez vos souvenirs ensemble.':'Share photos on your TV and relive your memories together.','03 / VIDÉOS':'03 / VIDEOS','Place au spectacle.':'Let the show begin.','Diffusez vos vidéos et profitez du grand écran.':'Stream your videos and enjoy the big screen.','04 / MUSIQUE':'04 / MUSIC','Créez l’ambiance.':'Set the mood.','Faites place à la musique pour accompagner vos moments à la maison.':'Bring music to your moments at home.','Installez-vous.':'Sit back.','Prenez le contrôle.':'Take control.','Retrouvez l’univers RemoteControl et les prochaines informations sur l’application.':'Explore RemoteControl and follow upcoming app news.','Suivre le créateur sur GitHub':'Follow the creator on GitHub','Le lien de téléchargement de l’application sera ajouté ici.':'The app download link will be added here.','Votre écran. Vos envies.':'Your screen. Your way.'
};
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const nodes = [];
while(walker.nextNode()) {
 const node = walker.currentNode;
 if (['SCRIPT','STYLE','OPTION'].includes(node.parentElement.tagName)) continue;
 const original = node.textContent;
 const key = original.trim();
 if (translations[key]) nodes.push({node,original,key});
}
const image = document.querySelector('figure img');
const imageAlt = image.alt;
const nav = document.querySelector('nav');
const title = document.title;
const meta = document.querySelector('meta[name="description"]');
const description = meta.content;
const select = document.getElementById('language');
function apply(language) {
 const en = language === 'en';
 document.documentElement.lang = en ? 'en' : 'fr';
 nodes.forEach(({node,original,key}) => {node.textContent = en ? original.replace(key, translations[key]) : original;});
 image.alt = en ? 'RemoteControl on a phone in front of a TV: TV control, photos, videos and music.' : imageAlt;
 nav.setAttribute('aria-label', en ? 'Main navigation' : 'Navigation principale');
 document.title = en ? 'RemoteControl — Your screen. Your way.' : title;
 meta.content = en ? 'RemoteControl: TV remote, photo sharing, videos and music.' : description;
 select.value = en ? 'en' : 'fr';
 try { localStorage.setItem('remotecontrol-language', select.value); } catch {}
}
let saved; try {saved=localStorage.getItem('remotecontrol-language');} catch {}
apply(saved === 'en' ? 'en' : 'fr');
select.addEventListener('change', () => apply(select.value));
})();
