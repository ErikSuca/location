window.addEventListener('load', async () => {
    let lang = localStorage.getItem('lang')
    
    if(!lang){
        localStorage.setItem('lang', navigator.languages[2])
        lang = localStorage.getItem('lang')
    }
    
    console.log(lang);
    
    const country = localStorage.getItem('country')

    if(!country){

        const getCountries = async (lang) => {
            try {
                const servidor = 'https://restcountries.eu/rest/v2/'
                const endpoint = `${servidor}lang/${lang}`
                
                const request = await fetch(endpoint)
                const result = await request.json()
                return result
            } catch (error) {
                console.clear();
                console.log('Error: ', error);
            }
        }
        let countries = await getCountries(lang)
        console.log(countries);
        
        const formCountries = document.createElement('form')
        
        countries.forEach(country => {
            let option = document.createElement('label')
            let flag = document.createElement('img')
            let input = document.createElement('input')
            
            flag.setAttribute('src', country.flag)
            input.setAttribute('id', country.alpha3Code)
            input.setAttribute('value', country.name)
            input.setAttribute('type', 'radio')
            input.setAttribute('name', 'country')
            
            option.appendChild(flag)
            option.appendChild(input)
            
            input.addEventListener('change', e => {
                const target = e.target
                const value = target.value
                if(!localStorage.getItem('country')){
                    localStorage.setItem('country', value)
                    location.reload()
                }
            })
            
            formCountries.appendChild(option)
        })
        
        document.body.appendChild(formCountries)
    } else {
        document.write(`<h2>Se conecto desde ${country}</h2>`)
        document.body.innerHTML += `<p>Si usted no es de aquí, presione el siguiente <a id ='lang' href = ''>boton</a> </p>`

        const btn = document.querySelector('#lang')

        btn.addEventListener('click', e => {
            e.preventDefault();
            localStorage.removeItem('country')
            location.reload();
        })
        
        const getLocation = async (position) =>{
            console.log(position);
            const cordenadas = position.coords
            const lat = cordenadas.latitude
            const lon = cordenadas.longitude
            console.log(lat,',',lon);
            const servidor = 'https://apis.datos.gob.ar/georef/api/'
            const endpoint = `${servidor}ubicacion?lat=${lat}&lon=${lon}`

            const request = await fetch(endpoint)
            const result = await request.json()

            let ubicacion = null
            if(result.ubicacion != undefined){
                if(result.ubicacion.provincia.id != '02'){
                    ubicacion = result.ubicacion.municipio.nombre
                } else {
                    ubicacion = result.ubicacion.provincia.nombre
                }
            }
            
            document.write(`<h3> Se conecto desde ${ubicacion} </h3>`)
            document.write(`<p>latitud: ${lat}</p>`)
            document.write(`<p>longitud: ${lon} </p>`)
            document.write(`<p>Sus cordenadas son ${lat},${lon} </p>`)
        }
        let algo = navigator.geolocation.getCurrentPosition(getLocation)
        console.log(algo);    
    }
})