module.exports = '<html lang="en">\n' +
                 '<head>\n' +
                 '    <title>4K Movies</title>\n' +
                 '    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"\n' +
                 '          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">\n' +
                 '\n' +
                 '</head>\n' +
                 '<body>\n' +
                 '<div class="container-fluid">\n' +
                 '    <hr>\n' +
                 '    <h4>4K Movies</h4>\n' +
                 '    <input class="form-control" id="myInput" type="text" placeholder="Search..">\n' +
                 '    <hr>\n' +
                 '    <div id="movie-list">\n' +
                 '        {{#each data}}\n' +
                 '            <div class="text-center">\n' +
                 '                <span>{{name}}</span>\n' +
                 '                {{#each tags}}\n' +
                 '                    <span class="badge badge-{{class}}">{{name}}</span>\n' +
                 '                {{/each}}\n' +
                 '            </div>\n' +
                 '        {{/each}}\n' +
                 '    </div>\n' +
                 '</div>\n' +
                 '    <hr>\n' +
                 '\n' +
                 '<div id="logs" style="display: none">{{logs}}</div>\n' +
                 '\n' +
                 '<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"\n' +
                 '        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"\n' +
                 '        crossorigin="anonymous"></script>\n' +
                 '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"\n' +
                 '        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"\n' +
                 '        crossorigin="anonymous"></script>\n' +
                 '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"\n' +
                 '        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"\n' +
                 '        crossorigin="anonymous"></script>\n' +
                 '<script>\n' +
                 '    $(document).ready(function () {\n' +
                 '        $(\'#myInput\').on(\'keyup\', function () {\n' +
                 '            var value = $(this).val().toLowerCase();\n' +
                 '            $(\'#movie-list div\').filter(function () {\n' +
                 '                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);\n' +
                 '            });\n' +
                 '        });\n' +
                 '    });\n' +
                 '</script>\n' +
                 '</body>\n' +
                 '</html>';