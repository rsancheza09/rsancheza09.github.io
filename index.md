# SCSS Files structure
We are thinking in the **CSS** structures in term of **objects** or **modules**.

Objects or modules are small little chunks of functionality. You can think of them as interface elements like headers, footers, buttons, and content areas.

Let's see the files structure:

## main.scss
It is going to import the global main stylesheets:
```SCSS
@import base/index;
@import layout/index;
@import components/index;
```

> ### base
It is a folder that contains the following stylesheets included into **index.scss**:

> ```SCSS
@import variables;
@import mixins;
@import resets;
@import helpers;
```
> > #### variables.scss
It is going to include fonts, font-sizes, colors, sizes.
> >#### mixins.scss
It is going to include mixins for fonts and media queries or any other mixins necessary globally into the application.
```SCSS
$tablet-width: 768px;
$desktop-with: 1024px;
@mixin tablet {
	@media (min-width: #{tablet-width}) and (max-width: #{desktop-with - 1px}) {
		@content;
	}
}
@mixin desktop {
	@media (min-width: #{desktop-width}) {
		@content;
	}
}
```
> > Example, how to use them:
```CSS
p {
	font-size: 16px;
	@include tablet {
		font-size: 18px;
	}
	@include desktop {
		font-size: 20px;
	}
}
```
> >#### resets.scss
It is going to include all the reset styles for the markup.
```CSS
h1 {
	padding: 0;
}
```
> >#### helpers.scss
It includes only classes that globally can be used in order to change a state.
```CSS
.show {
	display: block !important;
}
.hide {
	display: none !important;
}
```

> ### layout
It includes all styles for the grid of the application, we are going to use [flex-box](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). We are going to use the media queries in order to set the different views for tablet and mobile.
> ### components
We are going to have an exclusive stylesheet for each component, and they are going to be separated by *Common components* and *Features*.
> > Common components
These components are going to be implemented by other components. The name of these files are going to be in plural, i.e. **buttons.scss**.
The way that we are going to code the common is:
> >```SCSS
.button { // name in plural
	background-color: grey; // general styles
	&.is-active { // the modifiers should have the prefix .is-
		background-color: blue;
	}
}
```

## Naming Convention and Style Guide
### Style Guide
- No more than three levels for each class.

	>**Incorrect**
```SCSS
.content { // level 1
	.box { // level 2
		.left-column { // level 3
			p { // level 4
				font-size: 12px;
			}
		}
	}
}
```
**Correct**
```SCSS
.content { // level 1
	.box { // level 2
		.left-column p { // level 3
			font-size: 12px;
		}
	}
}
```

- Component names:
	>```CSS
.[component] || .[component_with_many_words] {
  	&--[element] { ... }
  	&--[element_with_many_words] { ... }
}
```

For reference check this naming convention [http://thesassway.com/advanced/modular-css-naming-conventions](http://thesassway.com/advanced/modular-css-naming-conventions)
