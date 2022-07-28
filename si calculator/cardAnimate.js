const header = document.getElementById('header')
const title = document.getElementById('title')
const except = document.getElementById('except')
const profile_img = document.getElementById('profile_img')
const name = document.getElementById('name')
const date = document.getElementById('date')

const animated_bgs = document.querySelectorAll('.animated-bg')
const animated_bg_texts = document.querySelectorAll('.animated-bg-text')

setTimeout(getData,2000)

function getData(){
    header.innerHTML = '<img src="Geulgram/20211129164505_1.jpg" alt="">'
    title.innerHTML = 'Lorem ipsum dolor sit amet.'
    except.innerHTML = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, eveniet.'
    profile_img.innerHTML = '<img src="Geulgram/20211027195642.jpg" alt="">'
    name.innerHTML = 'John Doe'
    date.innerHTML = 'Oct 08, 2020'

    animated_bgs.forEach(bg => bg.classList.remove('animated-bg'))
    animated_bg_texts.forEach(bg => bg.classList.remove('animated-bg-text'))
}