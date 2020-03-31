
class DoggyGram{

    constructor(postNumber){
        postNumber = postNumber || 10;
        this.urlProfileImages = 'https://dog.ceo/api/breeds/image/random';
        this.urlFakeNames = 'https://randomuser.me/api';
        this.postNumber = postNumber;
        this.btnRefresh = document.getElementById('btn-refresh');
        this.data = [];
        this.section = document.getElementById('section');
        this.initialitate();

    }
    async initialitate(){
        this.btnRefresh.disabled = true;
        this.api().then(()=>this.insertPosts());

    }
    async api(){

        return this.obtainData(this.urlProfileImages,0).then(()=>this.obtainData(this.urlFakeNames,1));

    }
    async obtainData(url,dataIndex){
        this.data[dataIndex] = [];
        let promises = Array(this.postNumber).fill(0).map(async (n)=>{
            try{
                let res;
                let xhr = await fetch(url).catch((error)=>{
                    return "error";
                });

                if(typeof(xhr) == "string"){
                    res = await this.data[dataIndex].push('undefined');
                }

                else{
                    let json = await xhr.json();
                    res = await this.data[dataIndex].push(json);
                }
                return res;
            }
            catch(err){
                this.data[dataIndex].push("undefined");
            }
        });
        return await Promise.all(promises);
    }

    sleep(delay){
        return new Promise(resolve=>setTimeout(resolve,delay));

    }
    getDate(){
        let date = new Date();
        let minute = String(date.getMinutes());
        let hour = String(date.getHours());
        if (minute.length == 1){
            minute = '0' + minute;
        }
        if (hour.length == 1){
            hour = '0' + hour;
        }
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${hour}:${minute}`

    }
    insertPosts(){
        let urlImagePosts = 'https://picsum.photos/id/:id/300/400';
        deletePosts(this.section);
        for(let i=0;i<this.postNumber;i++){
            let imageId = this.getImageId(100);
            let date = this.getDate();
            console.log(date);
            let urlImagePostsId = urlImagePosts.replace(':id',imageId);
            let post = document.createElement('article');
            post.classList.add('post');

            let dataProfile = document.createElement('div');
            dataProfile.classList.add('post-dataProfile');

            let imageProfile = document.createElement('img');
            imageProfile.classList.add('post-imageProfile');

            let nameProfile = document.createElement('h2');
            nameProfile.classList.add('post-nameProfile');

            let containerImagePost = document.createElement('figure');
            containerImagePost.classList.add('post-containerImagePost');

            let imagePost = document.createElement('img');
            imagePost.classList.add('post-imagePost');
            imagePost.setAttribute('src',`${urlImagePostsId}`);

            containerImagePost.appendChild(imagePost);

            let datePost = document.createElement('small');
            datePost.classList.add('post-datePost');
            datePost.innerHTML = `<p><h3>Date:</h3>${date}</p>`;

            let descriptionPost = document.createElement('p');
            descriptionPost.classList.add('post-descriptionPost');
            descriptionPost.innerHTML = 'Description Doggy Wauf';

            let srcImageProfile = this.data[0][i].message;
            let firstName, lastName;
            if(this.data[1][i] == 'undefined'){
                firstName = 'Anonymous';
                lastName = "Doggy"

            }
            else{
                firstName = this.data[1][i].results[0].name.first;
                lastName = this.data[1][i].results[0].name.last;
            }
            imageProfile.setAttribute('src',`${srcImageProfile}`);
            nameProfile.innerHTML = `${firstName} ${lastName}`;

            dataProfile.appendChild(imageProfile);
            dataProfile.appendChild(nameProfile);

            post.appendChild(dataProfile);
            post.appendChild(containerImagePost);
            post.appendChild(datePost);
            post.appendChild(descriptionPost);

            this.section.appendChild(post);
        }
        this.btnRefresh.disabled = false;
    }

    getImageId(limit){
        return Math.floor(Math.random()*limit);

    }

    chargeDefaultPosts(){
        for(let i=0;i<this.postNumber;i++){
            let date = this.getDate();
            let post = document.createElement('article');
            post.classList.add('post');

            let dataProfile = document.createElement('div');
            dataProfile.classList.add('post-dataProfile');

            let imageProfile = document.createElement('img');
            imageProfile.classList.add('post-imageProfile');
            imageProfile.src = 'images/siluet-dog.png';

            let nameProfile = document.createElement('h2');
            nameProfile.classList.add('post-nameProfile');

            let containerImagePost = document.createElement('figure');
            containerImagePost.classList.add('post-containerImagePost');

            let imagePost = document.createElement('img');
            imagePost.classList.add('post-imagePost');

            containerImagePost.appendChild(imagePost);

            let datePost = document.createElement('small');
            datePost.classList.add('post-datePost');
            datePost.innerHTML = `<p><h3>Date:</h3>${date}</p>`;

            let descriptionPost = document.createElement('p');
            descriptionPost.classList.add('post-descriptionPost');
            descriptionPost.innerHTML = 'Description Doggy Wauf';

            let firstName = 'Anonymous', lastName = 'Doggy';

            imageProfile.setAttribute('src','images/anonymous-doggy');
            nameProfile.innerHTML = `${firstName} ${lastName}`;

            dataProfile.appendChild(imageProfile);
            dataProfile.appendChild(nameProfile);

            post.appendChild(dataProfile);
            post.appendChild(containerImagePost);
            post.appendChild(datePost);
            post.appendChild(descriptionPost);

            this.section.appendChild(post);
        }
    }
}
window.doggyGram = new DoggyGram(5);
window.doggyGram.chargeDefaultPosts();

function newDoggyGram(){
    deletePosts(doggyGram.section);
    window.doggyGram.chargeDefaultPosts();
    window.doggyGram = new DoggyGram(5);

}
function deletePosts(section){
    let posts = document.getElementsByClassName('post');
    if(posts.length > 0){
        let parent = posts[0].parentNode;
        let numberPosts = posts.length;
        for(let i=0;i<numberPosts;i++){
            parent.removeChild(posts[0]);
        }
    }
}


var btnRefresh = document.getElementById('btn-refresh');
btnRefresh.addEventListener('click',newDoggyGram);
