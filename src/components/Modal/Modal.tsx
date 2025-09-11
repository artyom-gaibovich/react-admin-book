import { useEffect, useState } from 'react';
import styles from './Modal.module.css';

export function Modal({
	isOpen,
	onClose,
	children,
}: {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}) {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	const handleCopy = async () => {
		const textToCopy =
			typeof children === 'string' ? children : getTextFromChildren(children) || '';
		try {
			await navigator.clipboard.writeText(textToCopy);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000); // Сбросить через 2 сек
		} catch (err) {
			console.error('Ошибка при копировании', err);
		}
	};

	if (!isOpen) return null;

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<button className={styles.copyButton} onClick={handleCopy}>
					Копировать текст
				</button>
				{copied && <div className={styles.copyNotification}>Скопировано</div>}

				<button className={styles.closeModal} onClick={onClose}>
					&times;
				</button>
				<div className={styles.content}>{children}</div>

			</div>
		</div>
	);
}

function getTextFromChildren(node: React.ReactNode): string {
	if (typeof node === 'string') return node;
	if (typeof node === 'number') return node.toString();
	if (Array.isArray(node)) return node.map(getTextFromChildren).join('');
	if (typeof node === 'object' && node && 'props' in node)
		return getTextFromChildren((node as any).props.children);
	return '';
}
