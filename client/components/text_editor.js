var React = require('react');

var Editor = React.createClass({
	root: null,
	propTypes: {
		placeholder: React.PropTypes.string
	},
	getHTML: function(){
		return this.root.wysiwyg('shell').getHTML();
	},
	reset: function(){
		this.root.wysiwyg('shell').setHTML('');
	},
    setHTML: function(content){
        this.root.wysiwyg('shell').setHTML(content);
    },
	componentDidMount: function(){
		var root = this.root = $(React.findDOMNode(this));

		this.root.wysiwyg({
			toolbar: 'top',
			buttons: {
				insertimage: {
                    title: 'Chọn ảnh',
                    image: '\uf030'
                },
                insertlink: {
                    title: 'Thêm link',
                    image: '\uf08e'
                },
                fontname: {
                	title: 'Chữ',
                	image: '\uf031',
                	popup: function( $popup, $button ) {
                        var list_fontnames = {
                            'Arial, Helvetica' : 'Arial,Helvetica',
                            'Verdana'          : 'Verdana,Geneva',
                            'Georgia'          : 'Georgia',
                            'Courier New'      : 'Courier New,Courier',
                            'Times New Roman'  : 'Times New Roman,Times'
                        };
                        var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                                               .attr('unselectable','on');
                        $.each( list_fontnames, function( name, font ) {
                        	var $link = $('<a/>').attr('href','#')
                                            .css( 'font-family', font )
                                            .html( name )
                                            .click(function(event) {
                                                root.wysiwyg('shell').fontName(font).closePopup();
                                                event.stopPropagation();
                                                event.preventDefault();
                                                return false;
                                            });
                        	$list.append( $link );
                        });
                        $popup.append( $list );
                    }
                },
                fontsize: {
                	title: 'Kích cỡ',
                	image: '\uf034',
                	popup: function( $popup, $button ) {
                        var list_fontsizes = [];
                        for( var i=8; i <= 11; ++i )
                            list_fontsizes.push(i+'px');
                        for( var i=12; i <= 28; i+=2 )
                            list_fontsizes.push(i+'px');
                        list_fontsizes.push('36px');
                        list_fontsizes.push('48px');
                        list_fontsizes.push('72px');
                        var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                                               .attr('unselectable','on');
                        $.each( list_fontsizes, function( index, size ) {
                            var $link = $('<a/>').attr('href','#')
                                                .html( size )
                                                .click(function(event) {
                                                    root.wysiwyg('shell').fontSize(7).closePopup();
                                                    root.wysiwyg('container')
                                                            .find('font[size=7]')
                                                            .removeAttr("size")
                                                            .css("font-size", size);
                                                    event.stopPropagation();
                                                    event.preventDefault();
                                                    return false;
                                                });
                            $list.append( $link );
                        });
                        $popup.append( $list );
                    }
                },
                header: {
                	title: 'Tiêu đề',
                	image: '\uf1dc',
                	popup: function( $popup, $button ) {
                        var list_headers = {
                            'Header 1' : '<h1>',
                            'Header 2' : '<h2>',
                            'Header 3' : '<h3>',
                            'Header 4' : '<h4>',
                            'Header 5' : '<h5>',
                            'Header 6' : '<h6>',
                            'Code'     : '<pre>'
                        };
                        var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                                               .attr('unselectable','on');
                        $.each( list_headers, function( name, format ) {
                            var $link = $('<a/>').attr('href','#')
                                                 .css( 'font-family', format )
                                                 .html( name )
                                                 .click(function(event) {
                                                    root.wysiwyg('shell').format(format).closePopup();
                                                    event.stopPropagation();
                                                    event.preventDefault();
                                                    return false;
                                                });
                            $list.append( $link );
                        });
                        $popup.append( $list );
                    }
                },
                bold: {
                    title: 'Bold (Ctrl+B)',
                    image: '\uf032',
                    hotkey: 'b'
                },
                italic: {
                    title: 'Italic (Ctrl+I)',
                    image: '\uf033',
                    hotkey: 'i'
                },
                underline: {
                    title: 'Underline (Ctrl+U)',
                    image: '\uf0cd',
                    hotkey: 'u'
                },
                strikethrough: {
                    title: 'Strikethrough (Ctrl+S)',
                    image: '\uf0cc',
                    hotkey: 's'
                },
                forecolor: {
                    title: 'Text color',
                    image: '\uf1fc'
                },
                highlight: {
                    title: 'Background color',
                    image: '\uf043'
                },
                alignleft: {
                    title: 'Left',
                    image: '\uf036'
                },
                aligncenter: {
                    title: 'Center',
                    image: '\uf037'
                },
                alignright: {
                    title: 'Right',
                    image: '\uf038'
                },
                alignjustify: {
                    title: 'Justify',
                    image: '\uf039'
                },
                subscript: {
                    title: 'Subscript',
                    image: '\uf12c'
                },
                superscript: {
                    title: 'Superscript',
                    image: '\uf12b'
                },
                indent: {
                    title: 'Indent',
                    image: '\uf03c'
                },
                outdent: {
                    title: 'Outdent',
                    image: '\uf03b'
                },
                orderedList: {
                    title: 'Ordered list',
                    image: '\uf0cb'
                },
                unorderedList: {
                    title: 'Unordered list',
                    image: '\uf0ca'
                },
                removeformat: {
                    title: 'Remove format',
                    image: '\uf12d'
                }
			},
			submit: {
                title: 'Submit'
            },
            selectImage: 'Chọn hay kéo ảnh vào',
            placeholderUrl: 'www.google.com',
            placeholderEmbed: '<embed/>'
		});
	},
	render: function(){
		return (
			<textarea placeholder={this.props.placeholder}></textarea>
		)
	}
});

module.exports = Editor;