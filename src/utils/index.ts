// 根据属性扁平数组
export function flatArray<T>(array: T[], prop: string) {
    const _arr: T[] = [];
    array.forEach((item: T) => {
        const _child: T[] = (item as any)[prop];
        _arr.push(item);
        if (_child?.length) {
            _arr.push(...flatArray(_child, prop));
        }
    });
    return _arr;
}

// 利用a标签下载文件
export function downloadFile(fileUrl: string) {
    if (!fileUrl) {
        return '链接不存在';
    }
    try {
        let { pathname: fileName } = new window.URL(fileUrl);
        fileName = fileName.slice(fileName.lastIndexOf('/'));
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return true;
    } catch (error) {
        return (error as Error).message ?? '下载文件失败';
    }
}