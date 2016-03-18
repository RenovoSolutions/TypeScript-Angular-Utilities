## fileSize
A simple service for converting byte counts into human friendly storage size strings.

For example, `2048` is displayed as `2 KB`.

You can also query fileSize instances to ask for the integer number of GB, MB, KB, that results from the specified number of bytes.

Example usage:
```
import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __fileSize = services.fileSize;

class MyConsumer {
    static $inject: string[] = [__fileSize.factoryName];
    constructor(private fileSizeFactory: __fileSize.IFileSizeFactory) { }
  
    displayBytes(bytes: number): string {
        var instance = this.fileSizeFactory.getInstance(bytes); // Makes a file size instance based on the byte count
        return instance.display(); // Generates a pretty string displaying the bytes
    }
}
```

## fileSize filter
The fileSize module also contains an angular filter which will automatically instantiate a fileSize instance for you and print the display result:
```
<span>File size: {{ controller.bytes | fileSize }}</span>
```
