"use client";

import { observer } from "mobx-react";
import { NextPage } from "next";
import { useEffect } from "react";
import albumViewModel from "./album.viewmode";

interface Props {}

const Page: NextPage<Props> = () => {
	useEffect(() => {
		albumViewModel.getAlbums();
		return () => {};
	}, []);

	return (
		<div>
			{albumViewModel.albums.map((album) => {
				return <p key={album.id}>{album.title}</p>;
			})}
		</div>
	);
};

export default observer(Page);
