document.addEventListener('DOMContentLoaded', function () {

    const select = document.querySelector("#city");
    const result = document.getElementById('result');
    const API_KEY = '3a15fc798cc96d3c1fcdd4981e00ea85';

    const asyncWeather = function () { //天気の情報をAPIで取得しノードに追加する機能
        const cityName = select.value;
        const url = "http://api.openweathermap.org/data/2.5/weather?lang=ja&units=metric&q=" + cityName + "&appid=" + API_KEY;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json'; //結果をjson型で受け取る

        xhr.addEventListener('loadstart', function () {
            result.textContent = '通信中...';
        }, false);
        xhr.addEventListener('load', function () {
            result.textContent = '';
            const ul = document.createElement('ul');
            const frag = document.createDocumentFragment();
            const weather = this.response;

            const weatherInfo = {
                '都市': weather['name'],
                '天気': weather['weather'][0]['main'],
                '詳細': weather['weather'][0]['description'],
                '温度': weather['main']['temp'] + '℃',
                '湿度': weather['main']['humidity'] + '%',
                '風速': weather['wind']['speed'] + 'm/s',
                imgName: weather["weather"][0]["icon"] + ".png"
            };
            for (const key in weatherInfo) {
                if (weatherInfo[key] !== weatherInfo['imgName']) {
                    // weatherInfoを都度リストにしfragに一旦仮入れ
                    const li = document.createElement('li');
                    const text = document.createTextNode(key + ': ' + weatherInfo[key]);
                    li.appendChild(text);
                    frag.appendChild(li);
                } else {
                    // imgNameはimgタグにしてresultタグの一番最初に入れる
                    const img = document.createElement('img');
                    img.src = "http://openweathermap.org/img/w/" + weatherInfo[key];
                    const firstChild = result.firstChild;
                    result.insertBefore(img, firstChild);
                }
            }
            // fragに入ったwetherinfoをまとめてulへ入れresultタグに挿入
            ul.appendChild(frag);
            result.appendChild(ul);
        })
        xhr.send();
        xhr.addEventListener('error', function () {
            result.textContent = 'サーバーエラーが発生しました';
        }, false);
    };

    asyncWeather(); //選択がデフォルトの時
    select.addEventListener('change', function () { //選択が変わった時
        asyncWeather();
    })
}, false);



