## Installing

- Run `composer require rias/statamic-link-it`
- Publish the assets with `php artisan vendor:publish --provider="Rias\LinkIt\ServiceProvider"`
- You're done!

## Usage

Add the fieldtype to your fieldset by using the `link_it` handle. The most basic configuration is the following:

```yaml
fields:
  - 
    link:
      handle: link
      type: link_it
```

Content editors can then choose from all the following types:

### Url
![url](https://github.com/riasvdv/statamic-linkit/raw/master/docs/img/url.png)

### Custom
![custom](https://github.com/riasvdv/statamic-linkit/raw/master/docs/img/custom.png)

### Email
![email](https://github.com/riasvdv/statamic-linkit/raw/master/docs/img/email.png)

### Tel
![tel](https://github.com/riasvdv/statamic-linkit/raw/master/docs/img/tel.png)

### Asset
![asset](https://github.com/riasvdv/statamic-linkit/raw/master/docs/img/asset.png)

**Containers**
`array` - You have to define the asset containers in the field settings to use this type.

```yaml
fields:
  -
    handle: link
    field:
      type: link_it
      containers:
        - documents
```

### Term
![term](https://github.com/riasvdv/statamic-linkit/raw/master/docs/img/term.png)

**Taxonomies**
`array` - You have to define the taxonomies in the field settings to use this type.

```yaml
fields:
  -
    handle: link
    field:
      type: link_it
      taxonomies:
        - blog_categories
```

### Entry
![entry](https://github.com/riasvdv/statamic-linkit/raw/master/docs/img/entry.png)

**Collections**
`array` - You have to define the collections in the field settings to use this type.

```yaml
fields:
  -
    handle: link
    field:
      type: link_it
      collections:
        - blog
```

You can configure which types are allowed by adding a `types` setting to your fieldtype.

## Settings
This fieldtype supports the following settings. The default value is shown in the example.

### Required
`bool` - Whether this field is required

```yaml
fields:
  -
    handle: link
    field:
      type: link_it
      required: false
```

### Types
`array` - A set of types which content managers can choose from.

```yaml
fields:
  -
    handle: link
    field:
      type: link_it
      types:
        - asset
        - entry
        - custom
        - email
        - page
        - term
        - tel
        - url
```

To use the `asset`, `entry` and `term` types, please make sure you define the corresponding `containers`, `collections` and `taxonomies` settings.

### Default
`object` - Set default values, for example a default type.

```yaml
fields:
  -
    handle: link
    field:
      type: link_it
      default:
        type: url
```

### NewWindow
`bool` - Whether to give the choice to have links opened in a new window.

![New Window](https://github.com/riasvdv/statamic-linkit/raw/master/docs/img/new-window.png)

```yaml
fields:
  -
    handle: link
    field:
      type: link_it
      newWindow: false
```

### Text
`bool` - Whether to allow a custom link text. (For example "Read more")

![Text](https://github.com/riasvdv/statamic-linkit/raw/master/docs/img/text.png)

```yaml
fields:
  -
    handle: link
    field:
      type: link_it
      text: false
```

### Aria
`bool` - Whether to allow control over the `aria-label`.

![Aria](https://github.com/riasvdv/statamic-linkit/raw/master/docs/img/aria.png)

```yaml
fields:
  -
    handle: link
    field:
      type: link_it
      aria: false
```

### Title
`bool` - Whether to allow control over the link `title`.

![Title](https://github.com/riasvdv/statamic-linkit/raw/master/docs/img/title.png)

```yaml
fields:
  -
    handle: link
    field:
      type: link_it
      title: false
```

### Append
`bool` - Whether to allow users to append something to the url.

```yaml
fields:
  -
    handle: link
    field:
      type: link_it
      append: false
```

## The modifier

For easy usage, LinkIt comes with a modifier to generate a link tag or extract the necessary information.

### Generate a link tag
```
{{ link | linkIt }}
```

### Generate a link tag with classes
```
{{ link | linkIt:btn btn-link }}
```

### Get the link target
```
{{ link | linkIt:target }}
```

### Get the link text
```
{{ link | linkIt:text }}
```

### Get the link prefix (mailto: & tel:)
```
{{ link | linkIt:prefix }}
```

### Get the link url
```
{{ link | linkIt:url }}
```

### Get the link title
```
{{ link | linkIt:title }}
```

### Get the link aria label
```
{{ link | linkIt:aria }}
```

### Get the link type
```
{{ link | linkIt:type }}
```
