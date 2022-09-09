$(document).ready(function () {
    $("form").submit(function () {
        $.post("/process", $(this).serialize(), function (html) {
            $(".container").html(html);
        });
        return false;
    });
    $("#name").keyup(function () {
        $("form").submit();
    });
    $("[type=checkbox").change(function () {
        $("form").submit();
    });
    $("form").submit();
});
