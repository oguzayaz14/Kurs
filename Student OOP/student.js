// Javascript Codes Of The Student Object

/* 
TR: Öğrenci formunu kullanarak öğrenci ekleme, silme, güncelleme, arama ve listeleme işlemleri gerçekleştirmemize yarayacak fonksiyonları barındıran bir "Öğrenci" objesi yaratılmalı.
EN: A "Student" object which has the properties of functions such as adding, deleting, updating, searching and listing must be created.
*/

/*
TR: Ana "Öğrenci" fonksiyonu.
EN: Main "Student" function.
*/

function Student () {

    console.log("Yeni öğrenci objesi oluşturuldu.");

}

/**
 * @function ekle - TR: Parametre olarak alınan objeyi localStorage'a ekler. / EN: Adds the object which is taken as a parameter into the localStorage.
 * @param {object} info - TR: Ad, soyad, numara, sınıf vs. bilgilerin toplandığı obje. / EN: The object which contains the data about name, surname, number, clasroom etc.
 */
Student.prototype.ekle = function (info) {

    info["fullName"] = `${info.name} ${info.surname}`;

    localStorage[info.number] = JSON.stringify(info);

    console.log(`${info.fullName} öğrencilere eklendi.`)

}

/**
 * @function sil - TR: Parametre olarak alınan numaraya sahip localStorage itemini siler. / EN: Deletes the item from localStorage which has the same number.
 * @param {string} ogrId - TR: Silinecek numara, localStorage "key"i. / EN: The number and the localStorage key which is intended to be deleted.
 */
Student.prototype.sil = function (ogrId) {

    try {
        
        var ogrInformation = JSON.parse(localStorage[ogrId]);

        var confirmResult = confirm (`${ogrInformation.fullName} isimli ve ${ogrInformation.number} numaralı öğrenciyi silmek istediğinize emin misiniz?`);
        if (confirmResult) {
            alert (`${ogrInformation.name} isimli ve ${ogrInformation.number} numaralı öğrenci başarıyla silindi.`);
            delete localStorage[ogrId];
        } else {
            alert ("Silme işleminden vazgeçildi.");
        }

    } catch (error) {
        
        console.log("Bir hata oluştu. " + error);

    }

}

/**
 * @function ara - TR: Seçilen arama kriteri ile aranan değer parametrelerini localStorage içinde arayıp sonucu konsola yazar. / EN: Makes a search in localStorage with the parameters of search critera and the search value then writes thee result in the console.
 * @param {string} srcType - TR: Aramanın hangi "key" için yapılacağını belirleyen parametre. / EN: The parameter which defines the search key. 
 * @param {string} srcValue - TR: "String" olarak aranacak değerin parametresi. / EN: The string-type-parameter of the search value.
 */
Student.prototype.ara = function (srcType, srcValue) {

    try {
        
        if (srcType === "number") {

            for (key in localStorage) {

                if (srcValue === key) {

                    console.log(JSON.parse(localStorage[srcValue]));

                    return JSON.parse(localStorage[srcValue]);

                }

            }

            return {};

        } else {

            var result = [];

            for (key in localStorage) {

                if (typeof localStorage[key] === "string" && localStorage[key].indexOf("{") >= 0) {

                    if (JSON.parse(localStorage[key])[srcType] && JSON.parse(localStorage[key])[srcType].indexOf(srcValue) >= 0) {

                        result.push(JSON.parse(localStorage[key]));

                    }

                }

            }

            console.log(result);

            return result;

        }

    } catch (error) {
        
        console.log("Bir hata oluştu. " + error);

    }

}

/**
 * @function guncelle - 
 * @param {string} ogrId -
 * @param {string} key -
 * @param {string} val -
 */
Student.prototype.guncelle = function (ogrId, key, val) {

    try {
        
        var std = this.ara("number" , ogrId);

        std[key] = val;

        this.ekle(std);

        console.log("Öğrenci güncellendi.");

        console.log(std);

    } catch (error) {
        
        console.log("Bir hata oluştu. "+ error);

    }

}