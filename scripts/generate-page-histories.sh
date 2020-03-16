#!/bin/sh

for filename in $PAGE_DIR/*.md; do
	pagename=${filename##*/}
	pagename=${pagename%.*}
	echo $pagename
	echo "<pre>$(git log -p --follow --pretty=format:"Commit: %H%nDate: %cd%n%n%w(80,4,4)%B" $filename)</pre>" > $OUTPUT_DIR$pagename.history.html
done
