window.revelar = ScrollReveal({reset:true})

revelar.reveal('.anim-1',{
    duration: 2000,
    distance: '90px'
})

revelar.reveal('.anim-card-1',{
    duration: 2000,
    distance: '90px',
    delay: 100
})

revelar.reveal('.anim-card-2',{
    duration: 2000,
    distance: '90px',
    delay: 250
})

revelar.reveal('.anim-card-3',{
    duration: 2000,
    distance: '90px',
    delay: 500
})

revelar.reveal('.anim-2',{
    duration: 2000,
    distance: '90px',
    origin: 'left'
})

revelar.reveal('.anim-3',{
    duration: 2000,
    distance: '90px',
    origin: 'right',
    delay: 500
})

revelar.reveal('#userPrompt',{
    duration: 2000,
    distance: '90px',
    delay: 500
})

revelar.reveal('#botResponse',{
    duration: 2000,
    distance: '90px',
    delay: 500
})