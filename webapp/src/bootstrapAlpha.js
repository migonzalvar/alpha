export default {
  navtabs: function ($) {
    let hash = window.location.hash
    $("a[href='" + hash + "']").click()

    $('.nav-tabs .nav-link').click((e) => {
      window.location.hash = $(e.target).attr('href').substr(1)
    })
  },
  langToogle: function ($) {
    $('.dropdown-menu .dropdown-item', $('#langdropdown').parent())
      .click((e) => {
        $('#lang-form input[name=language]').val($(e.target).attr('href').substr(1))
        $('#lang-form').submit()
      })
  }
}
