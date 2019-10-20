const source = document.getElementById("register-template").innerHTML;
const template = Handlebars.compile(source);

const context = {
    test_messagge: "This is a test",
    body: "This is my first post!"
};

const html = template(context);
const page = document.getElementsByClassName('.content-placeholder').html(html);
