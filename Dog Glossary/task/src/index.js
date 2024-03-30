document.getElementById('button-random-dog').addEventListener('click', getRandomDog);
document.getElementById('button-show-breed').addEventListener('click', getSpecificBreed);
document.getElementById('button-show-sub-breed').addEventListener('click', getListSubBreed);
document.getElementById('button-show-all').addEventListener('click', getAllBreeds);
async function getRandomDog() {
    try {
        removeErrorMessage();
        removeImage();
        removeBreedList();
        const { message } = await (await fetch('https://dog.ceo/api/breeds/image/random')).json();
        return updateRandomImage(message);
    } catch(e) {
        console.log(e);
    }
}

function updateRandomImage(src) {
    const imageContainer = document.getElementById('content');
    const imgEl = document.createElement('img');
    imgEl.src = src;
    imageContainer.appendChild(imgEl);
}

function removeImage() {
    const oldImg = document.querySelector('img');
    if (oldImg) {
        oldImg.remove();
    }
}

async function getSpecificBreed() {
    try {
        removeErrorMessage();
        removeImage();
        removeBreedList();
        const searchText = document.getElementById('input-breed').value.toLowerCase();

        if (!searchText) {
            throw new Error('Empty search box.')
        }

        const { message, status } = await(await fetch(`https://dog.ceo/api/breed/${searchText}/images/random`)).json();

        if (status === 'error') {
            throw new Error('Breed not found!')
        }

        return updateRandomImage(message);
    } catch (err) {
        showErrorMessage(err)
    }
}

async function getListSubBreed() {
    try {
        removeErrorMessage();
        removeImage();
        removeBreedList();
        const searchText = document.getElementById('input-breed').value.toLowerCase();

        if (!searchText) {
            throw new Error('Empty search box.')
        }

        const { message, status } = await(await fetch(`https://dog.ceo/api/breed/${searchText}/list`)).json();

        if (status === 'error') {
            throw new Error('Sub-Breed not found!')
        }

        if (!message.length) {
            throw new Error('No sub-breeds found!')
        }

        return updateBreedList(message);
    } catch (err) {
        showErrorMessage(err)
    }
}

async function getAllBreeds() {
    try {
        removeErrorMessage();
        removeImage();
        removeBreedList();

        const { message, status } = await(await fetch(`https://dog.ceo/api/breeds/list/all`)).json();

        if (status === 'error') {
            throw new Error('Sub-Breed not found!')
        }

        if (!message) {
            throw new Error('No Breeds found!')
        }

        return updateAllBreedsList(message);
    } catch (err) {
        showErrorMessage(err)
    }
}

function updateBreedList(list) {
    const container = document.getElementById('content');
    const listEl = document.createElement('ol');

    for (let key of list) {
        const itemEl = document.createElement('li');
        itemEl.textContent = key;
        listEl.appendChild(itemEl);
    }
    return container.appendChild(listEl);
}

function updateAllBreedsList(breeds) {
    const container = document.getElementById('content');
    const listEl = document.createElement('ol');

    const keys = Object.keys(breeds);

    for (let key of keys) {
        const li = document.createElement('li');
        li.textContent = key;
        if (breeds[key].length) {
            const uListEl = document.createElement('ul');
            for (let item of breeds[key]) {
                const li = document.createElement('li');
                li.textContent = item;
                uListEl.appendChild(li);
            }
            li.appendChild(uListEl);
        }
        listEl.appendChild(li);
    }

    container.appendChild(listEl);
}

function removeBreedList() {
    const list = document.querySelector('ol');
    if (list) {
        list.remove();
    }
}

function showErrorMessage(err) {
    const paragraphEl = document.createElement('p');
    paragraphEl.textContent = err.message;
    document.body.appendChild(paragraphEl);
}

function removeErrorMessage() {
    const paragraphEl = document.querySelector('p');
    if (paragraphEl) paragraphEl.remove();
}